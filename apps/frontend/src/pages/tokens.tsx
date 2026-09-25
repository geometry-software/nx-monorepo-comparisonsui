import { KeyRound, Pencil, Search } from "lucide-react";
import {
  Alert, AlertDescription, Button, Card, CardContent, DataTable,
  EntityDialog, FilterSelect, Input, OperationNotice,
} from "@cui/ui/components";
import { tableLabels } from "../app/i18n";
import { formatDateTime } from "../lib/format-date";
import { Field, TokenStatusToggle } from "./tokens/token-components";
import { useTokens, type TokenRow, type TokenSort } from "./tokens/use-tokens";

export function Tokens() {
  const {
    language, translate: t, loading, loadError, load, search, setSearch, sort, setSort,
    order, setOrder, page, setPage, limit, setLimit, editTarget, dialogOpen,
    setDialogOpen, verifiedAt, setVerifiedAt, closedAt, setClosedAt, busy,
    error, notice, setNotice, rows, pages, total, changeQuery, openDialog, submit,
  } = useTokens();

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Tokens</h1>
          <p className="mt-2 text-muted-foreground">
            Manage session provider identifiers stored in the SQL sessions table.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => openDialog(null)} size="lg">
            <KeyRound /> Add Token
          </Button>
        </div>
      </header>

      {loadError && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between gap-4">
            <span>{loadError}</span>
            <Button onClick={() => void load()} size="sm" variant="outline">Retry</Button>
          </AlertDescription>
        </Alert>
      )}

      {!loadError && <DataTable<TokenRow>
        columns={[
          { label: 'Session ID', render: (row) => <strong>{row.sessionId}</strong> },
          { label: 'Token', render: (row) => <code className="break-all text-sm">{row.token}</code> },
          { label: 'Provider', render: (row) => row.provider },
          { label: 'Created', className: 'whitespace-nowrap', render: (row) => formatDateTime(row.createdAt, language) },
          { label: 'Verified', className: 'whitespace-nowrap', render: (row) => row.verifiedAt ? formatDateTime(row.verifiedAt, language) : '—' },
          { label: 'Closed', className: 'whitespace-nowrap', render: (row) => row.closedAt ? formatDateTime(row.closedAt, language) : '—' },
          {
            label: 'Actions',
            className: 'w-16',
            render: (row) => (
              <div className="flex justify-end">
                <Button aria-label={`Edit session ${row.sessionId}`} onClick={() => openDialog(row)} size="icon" variant="ghost"><Pencil /></Button>
              </div>
            ),
          },
        ]}
        itemLabel="tokens"
        searchBar={(
          <Card>
            <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <Field label="Search tokens">
                <div className="relative">
                  <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-muted-foreground" />
                  <Input className="w-full pl-9 lg:w-80" placeholder="Search by session ID, token, or provider" value={search} onChange={(event) => changeQuery(() => setSearch(event.target.value))} />
                </div>
              </Field>
              <div className="flex flex-wrap items-end gap-3">
                <Field label="Sort">
                  <FilterSelect ariaLabel="Sort tokens" value={sort} onChange={(value) => changeQuery(() => setSort(value as TokenSort))} options={[
                    { value: 'createdAt', label: 'Created date' },
                    { value: 'verifiedAt', label: 'Verified date' },
                    { value: 'closedAt', label: 'Closed date' },
                    { value: 'sessionId', label: 'Session ID' },
                    { value: 'token', label: 'Token' },
                    { value: 'provider', label: 'Provider' },
                  ]} />
                </Field>
                <div className="flex gap-1 rounded-lg border p-1">
                  {(['desc', 'asc'] as const).map((value) => (
                    <Button key={value} onClick={() => changeQuery(() => setOrder(value))} size="sm" variant={order === value ? 'default' : 'ghost'}>{value === 'desc' ? 'Desc' : 'Asc'}</Button>
                  ))}
                </div>
                <Field label="Show">
                  <FilterSelect ariaLabel="Tokens per page" value={String(limit)} onChange={(value) => changeQuery(() => setLimit(Number(value)))} options={[5, 10, 20].map((value) => ({ value: String(value), label: `${value} rows` }))} />
                </Field>
              </div>
            </CardContent>
          </Card>
        )}
        labels={tableLabels(t)}
        loading={loading}
        onPage={setPage}
        page={page}
        pageSize={limit}
        pages={pages}
        rows={rows}
        total={total}
      />}

      <EntityDialog description="Token is the provider ID stored with the session, not an authentication credential." onClose={() => !busy && setDialogOpen(false)} open={dialogOpen} title={editTarget ? 'Edit Token' : 'Add Token'}>
        <form className="grid gap-4" key={editTarget?.sessionId ?? 'new'} onSubmit={(event) => void submit(event)}>
          <Field label="Token (provider ID)"><Input defaultValue={editTarget?.token} disabled={Boolean(editTarget)} name="token" required={!editTarget} /></Field>
          <Field label="Provider"><Input defaultValue={editTarget?.provider} disabled={Boolean(editTarget)} name="provider" required={!editTarget} /></Field>
          {editTarget && (
            <div className="grid gap-3">
              <TokenStatusToggle disabled={busy} displayValue={verifiedAt ? formatDateTime(verifiedAt, language) : 'Not set'} label="Verify" onChange={(checked) => setVerifiedAt(checked ? new Date().toISOString() : null)} value={verifiedAt} />
              <TokenStatusToggle disabled={busy} displayValue={closedAt ? formatDateTime(closedAt, language) : 'Not set'} label="Close" onChange={(checked) => setClosedAt(checked ? new Date().toISOString() : null)} value={closedAt} />
            </div>
          )}
          {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
          <Button disabled={busy} size="lg" type="submit">{editTarget ? 'Save changes' : 'Add Token'}</Button>
        </form>
      </EntityDialog>

      {notice && <OperationNotice closeLabel="Close" message={notice} onClose={() => setNotice('')} />}
    </section>
  );
}
