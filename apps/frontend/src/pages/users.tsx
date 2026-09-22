import { Pencil, Search, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Alert,
  AlertDescription,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  ConfirmDialog,
  DataTable,
  EntityDialog,
  FilterSelect,
  Input,
  Label,
  OperationNotice,
} from '@cui/ui/components';
import { confirmDialogLabels, tableLabels, useI18n } from '../app/i18n';
import { formatDateTime } from '../lib/format-date';

type UserRole = 'viewer' | 'manager' | 'admin';
type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};
type UserSort = 'createdAt' | 'updatedAt' | 'name' | 'email' | 'role';

const initialUsers: User[] = [
  createInitialUser('Ada Lovelace', 'ada@example.com', 'admin', '2026-08-14'),
  createInitialUser('Grace Hopper', 'grace@example.com', 'manager', '2026-08-18'),
  createInitialUser('Linus Torvalds', 'linus@example.com', 'viewer', '2026-08-22'),
];

export function Users() {
  const { language, t } = useI18n();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<UserSort>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [role, setRole] = useState<UserRole>('viewer');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return users
      .filter((user) =>
        term
          ? [user.name, user.email, user.role].some((value) =>
              value.toLocaleLowerCase().includes(term),
            )
          : true,
      )
      .sort((left, right) => {
        const result = String(left[sort]).localeCompare(String(right[sort]));
        return order === 'asc' ? result : -result;
      });
  }, [order, search, sort, users]);
  const pages = Math.max(1, Math.ceil(filteredUsers.length / limit));
  const visibleUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  useEffect(() => {
    if (page > pages) setPage(pages);
  }, [page, pages]);

  function changeQuery(change: () => void) {
    change();
    setPage(1);
    setSelectedIds(new Set());
  }

  function openCreateDialog() {
    setEditTarget(null);
    setRole('viewer');
    setError('');
    setDialogOpen(true);
  }

  function openEditDialog(user: User) {
    setEditTarget(user);
    setRole(user.role);
    setError('');
    setDialogOpen(true);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim().toLocaleLowerCase();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a name and a valid email address.');
      return;
    }
    if (
      users.some(
        (user) => user.email === email && user.id !== editTarget?.id,
      )
    ) {
      setError('A user with this email already exists.');
      return;
    }

    const now = new Date().toISOString();
    setUsers((current) =>
      editTarget
        ? current.map((user) =>
            user.id === editTarget.id
              ? { ...user, name, email, role, updatedAt: now }
              : user,
          )
        : [
            ...current,
            {
              id: crypto.randomUUID(),
              name,
              email,
              role,
              active: true,
              createdAt: now,
              updatedAt: now,
            },
          ],
    );
    setNotice(editTarget ? `${name} was updated.` : `${name} was added.`);
    setDialogOpen(false);
    setError('');
  }

  function deleteUser() {
    if (!deleteTarget) return;
    setUsers((current) =>
      current.filter((user) => user.id !== deleteTarget.id),
    );
    setSelectedIds((current) => {
      const next = new Set(current);
      next.delete(deleteTarget.id);
      return next;
    });
    setNotice(`${deleteTarget.name} was removed.`);
    setDeleteTarget(null);
  }

  function deleteSelectedUsers() {
    const count = selectedIds.size;
    setUsers((current) =>
      current.filter((user) => !selectedIds.has(user.id)),
    );
    setSelectedIds(new Set());
    setBulkDeleteOpen(false);
    setNotice(`${count} selected ${count === 1 ? 'user was' : 'users were'} removed.`);
  }

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Users</h1>
          <p className="mt-2 text-muted-foreground">
            Manage users, roles, and access status for this workspace.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={selectedIds.size === 0}
            onClick={() => setBulkDeleteOpen(true)}
            size="lg"
            variant="destructive"
          >
            <Trash2 /> Delete selected ({selectedIds.size})
          </Button>
          <Button onClick={openCreateDialog} size="lg">
            <UserPlus /> Add user
          </Button>
        </div>
      </header>

      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Field label="Search users">
            <div className="relative">
              <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-muted-foreground" />
              <Input
                className="w-full pl-9 lg:w-80"
                placeholder="Search by name, email, or role"
                value={search}
                onChange={(event) =>
                  changeQuery(() => setSearch(event.target.value))
                }
              />
            </div>
          </Field>
          <div className="flex flex-wrap items-end gap-3">
            <Field label="Sort">
              <FilterSelect
                ariaLabel="Sort users"
                value={sort}
                onChange={(value) =>
                  changeQuery(() => setSort(value as UserSort))
                }
                options={[
                  { value: 'createdAt', label: 'Created date' },
                  { value: 'updatedAt', label: 'Updated date' },
                  { value: 'name', label: 'Name' },
                  { value: 'email', label: 'Email' },
                  { value: 'role', label: 'Role' },
                ]}
              />
            </Field>
            <div className="flex gap-1 rounded-lg border p-1">
              {(['desc', 'asc'] as const).map((value) => (
                <Button
                  key={value}
                  onClick={() => changeQuery(() => setOrder(value))}
                  size="sm"
                  variant={order === value ? 'default' : 'ghost'}
                >
                  {value === 'desc' ? 'Desc' : 'Asc'}
                </Button>
              ))}
            </div>
            <Field label="Show">
              <FilterSelect
                ariaLabel="Users per page"
                value={String(limit)}
                onChange={(value) =>
                  changeQuery(() => setLimit(Number(value)))
                }
                options={[5, 10, 20].map((value) => ({
                  value: String(value),
                  label: `${value} rows`,
                }))}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <DataTable<User>
        columns={[
          {
            label: 'Name',
            render: (user) => (
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{initials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="grid">
                  <strong>{user.name}</strong>
                  <small className="text-muted-foreground">
                    UID: {user.id.slice(-6).toUpperCase()}
                  </small>
                </span>
              </div>
            ),
          },
          {
            label: 'Email',
            render: (user) => <code className="text-sm">{user.email}</code>,
          },
          {
            label: 'Role',
            render: (user) => (
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
            ),
          },
          {
            label: 'Updated',
            className: 'w-44 whitespace-nowrap',
            render: (user) => formatDateTime(user.updatedAt, language),
          },
          {
            label: 'Actions',
            className: 'w-24',
            render: (user) => (
              <div className="flex justify-end gap-1">
                <Button
                  aria-label={`Edit ${user.name}`}
                  onClick={() => openEditDialog(user)}
                  size="icon"
                  variant="ghost"
                >
                  <Pencil />
                </Button>
                <Button
                  aria-label={`Delete ${user.name}`}
                  onClick={() => setDeleteTarget(user)}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
              </div>
            ),
          },
        ]}
        itemLabel="users"
        labels={tableLabels(t)}
        loading={false}
        onPage={setPage}
        onSelectedIdsChange={setSelectedIds}
        page={page}
        pageSize={limit}
        pages={pages}
        rows={visibleUsers}
        selectedIds={selectedIds}
        total={filteredUsers.length}
      />

      <EntityDialog
        description="Name, email, and role are required."
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        title={editTarget ? 'Edit user' : 'Add user'}
      >
        <form className="grid gap-4" key={editTarget?.id ?? 'new'} onSubmit={submit}>
          <Field label="Full name">
            <Input defaultValue={editTarget?.name} name="name" />
          </Field>
          <Field label="Email">
            <Input defaultValue={editTarget?.email} name="email" type="email" />
          </Field>
          <Field label="Role">
            <FilterSelect
              ariaLabel="User role"
              className="w-full"
              value={role}
              onChange={(value) => setRole(value as UserRole)}
              options={(['viewer', 'manager', 'admin'] as const).map(
                (value) => ({ value, label: capitalize(value) }),
              )}
            />
          </Field>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button size="lg" type="submit">
            <UserPlus /> {editTarget ? 'Save changes' : 'Add user'}
          </Button>
        </form>
      </EntityDialog>

      <ConfirmDialog
        busy={false}
        error=""
        itemName={deleteTarget?.name ?? ''}
        labels={confirmDialogLabels(t)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteUser}
        open={Boolean(deleteTarget)}
      />
      <ConfirmDialog
        busy={false}
        error=""
        itemName={`${selectedIds.size} selected users`}
        labels={confirmDialogLabels(t)}
        onClose={() => setBulkDeleteOpen(false)}
        onConfirm={deleteSelectedUsers}
        open={bulkDeleteOpen}
      />
      {notice && (
        <OperationNotice
          closeLabel="Close"
          message={notice}
          onClose={() => setNotice('')}
        />
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function createInitialUser(
  name: string,
  email: string,
  role: UserRole,
  date: string,
): User {
  const timestamp = `${date}T12:00:00.000Z`;
  return {
    id: crypto.randomUUID(),
    name,
    email,
    role,
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

function capitalize(value: string): string {
  return `${value[0].toUpperCase()}${value.slice(1)}`;
}
