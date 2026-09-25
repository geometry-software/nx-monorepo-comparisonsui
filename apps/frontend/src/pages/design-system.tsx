import { AlertTriangle, CheckCircle2, Plus, Search, Trash2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import {
  Autocomplete,
  Badge,
  Button,
  ButtonLoader,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  DataTable,
  EmptyList,
  EntityDialog,
  FilterSelect,
  Input,
  Label,
  Notification,
} from '@cui/ui/components';
import {
  confirmDialogLabels,
  tableLabels,
  type Language,
  useI18n,
} from '../app/i18n';

type SampleRow = { id: string; name: string; status: string };

const descriptions: Record<Language, Record<string, string>> = {
  en: {
    Button:
      'The main action control. It supports visual variants, sizes, icons, disabled state, and request progress.',
    Input:
      'A single-line field used in observation forms. It has focused and invalid states.',
    Autocomplete:
      'A searchable input with an accessible suggestion list. It supports loading, empty, disabled, and invalid states.',
    FilterSelect:
      'The application select used by sorting, page-size, and role controls. It has a consistent trigger and accessible menu.',
    DataTable:
      'The reusable table used by data-source lists. It renders custom columns, loading and empty states, totals, and pagination.',
    Dialog:
      'Modal patterns for forms and regular or destructive confirmations, with consistent titles, controls, and request states.',
    Notification:
      'A short operation result message with a status icon and an explicit close action.',
    EmptyList:
      'A centered empty state for tables and collections with no items. The message can be customized.',
  },
  es: {
    Button:
      'Control principal de acción. Admite variantes, tamaños, iconos, estado deshabilitado y progreso de solicitudes.',
    Input:
      'Campo de una línea usado en búsqueda, acceso, registro y formularios. Tiene estados de foco y error.',
    Autocomplete:
      'Campo de búsqueda con una lista accesible de sugerencias. Admite carga, vacío, deshabilitado y error, y se usa para país y ciudad dependientes.',
    FilterSelect:
      'Selector de la aplicación para orden, tamaño de página y roles, con menú accesible y aspecto uniforme.',
    DataTable:
      'Tabla reutilizable para fuentes de datos con columnas, carga, estado vacío, totales y paginación.',
    Dialog:
      'Patrones de modal para formularios y confirmaciones normales o destructivas, con títulos, controles y estados de solicitud uniformes.',
    Notification:
      'Mensaje breve sobre el resultado de una operación, con icono de estado y cierre explícito.',
    EmptyList:
      'Estado vacío centrado para tablas y colecciones sin elementos. El mensaje se puede personalizar.',
  },
  pt: {
    Button:
      'Controle principal de ação. Aceita variantes, tamanhos, ícones, estado desabilitado e progresso da solicitação.',
    Input:
      'Campo de uma linha usado em busca, login, cadastro e formulários. Possui estados de foco e erro.',
    Autocomplete:
      'Campo de busca com uma lista acessível de sugestões. Aceita carregamento, vazio, desabilitado e erro, e é usado nos campos dependentes de país e cidade.',
    FilterSelect:
      'Seletor da aplicação para ordenação, tamanho da página e funções, com menu acessível e visual uniforme.',
    DataTable:
      'Tabela reutilizável para fontes de dados com colunas, carregamento, vazio, totais e paginação.',
    Dialog:
      'Padrões de modal para formulários e confirmações comuns ou destrutivas, com títulos, controles e estados de solicitação consistentes.',
    Notification:
      'Mensagem curta sobre o resultado de uma operação, com ícone de estado e ação de fechar.',
    EmptyList:
      'Estado vazio centralizado para tabelas e coleções sem itens. A mensagem pode ser personalizada.',
  },
};

export function DesignSystem() {
  const { language, t } = useI18n();
  const [sort, setSort] = useState('createdAt');
  const [autocompleteValue, setAutocompleteValue] = useState('');
  const [page, setPage] = useState(1);
  const [tableSearch, setTableSearch] = useState('');
  const [tableStatus, setTableStatus] = useState('all');
  const [tableSort, setTableSort] = useState('name');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [entityOpen, setEntityOpen] = useState(false);
  const [entityCategory, setEntityCategory] = useState('numeric');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const sampleRows: SampleRow[] = Array.from({ length: 12 }, (_, index) => ({
    id: String(index + 1),
    name: `Observation ${index + 1}`,
    status: index % 2 === 0 ? 'Active' : 'Draft',
  }));
  const filteredRows = sampleRows
    .filter((row) => row.name.toLowerCase().includes(tableSearch.trim().toLowerCase()))
    .filter((row) => tableStatus === 'all' || row.status.toLowerCase() === tableStatus)
    .sort((left, right) => tableSort === 'status'
      ? left.status.localeCompare(right.status) || left.name.localeCompare(right.name, undefined, { numeric: true })
      : left.name.localeCompare(right.name, undefined, { numeric: true }));
  const tablePages = Math.max(1, Math.ceil(filteredRows.length / 2));
  const tablePage = Math.min(page, tablePages);
  const rows = filteredRows.slice((tablePage - 1) * 2, tablePage * 2);
  const componentCount = Object.keys(descriptions.en).length;

  return (
    <div className="space-y-8">
      <header>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {t('designSystem.title')}
            </h1>
            <p className="mt-2 max-w-3xl text-lg text-muted-foreground">
              {t('designSystem.subtitle')}
            </p>
          </div>
          <Badge className="h-8 px-3 text-sm" variant="outline">
            {t('designSystem.componentsCount', { count: componentCount })}
          </Badge>
        </div>
      </header>

      <section>
        <div className="grid gap-4 lg:grid-cols-2">
          <Showcase name="Button" description={descriptions[language].Button}>
            <Button>
              <Plus /> Primary
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">
              <Trash2 /> Error
            </Button>
            <Button disabled>
              <ButtonLoader /> Loading…
            </Button>
          </Showcase>

          <Showcase name="Input" description={descriptions[language].Input}>
            <div className="grid w-full max-w-sm gap-2">
              <Label htmlFor="design-system-input">Observation label</Label>
              <Input id="design-system-input" placeholder="Enter a value" />
            </div>
            <div className="grid w-full max-w-sm gap-2">
              <Label htmlFor="design-system-invalid">Invalid field</Label>
              <Input
                aria-invalid="true"
                defaultValue="Incorrect value"
                id="design-system-invalid"
              />
            </div>
          </Showcase>

          <Showcase
            className="relative z-20 overflow-visible"
            name="Autocomplete"
            description={descriptions[language].Autocomplete}
          >
            <div className="grid w-full max-w-sm gap-2">
              <Label>Series</Label>
              <Autocomplete
                ariaLabel="Series"
                emptyText="No series found."
                onSearchChange={setAutocompleteValue}
                onSelect={(option) => setAutocompleteValue(option.label)}
                options={[
                  { value: 'mongodb', label: 'MongoDB' },
                  { value: 'firebase', label: 'Firebase' },
                ]}
                placeholder="Search series..."
                value={autocompleteValue}
              />
            </div>
          </Showcase>

          <Showcase
            name="FilterSelect"
            description={descriptions[language].FilterSelect}
          >
            <div className="grid gap-2">
              <Label>Sort field</Label>
              <FilterSelect
                ariaLabel="Sort field"
                onChange={setSort}
                options={[
                  { value: 'createdAt', label: 'Created date' },
                  { value: 'updatedAt', label: 'Updated date' },
                  { value: 'name', label: 'Name' },
                ]}
                value={sort}
              />
            </div>
          </Showcase>

          <Showcase
            className="lg:col-span-2"
            name="DataTable"
            description={descriptions[language].DataTable}
          >
            <div className="w-full overflow-hidden">
              <DataTable
                labels={tableLabels(t)}
                columns={[
                  { label: 'Name', render: (row) => row.name },
                  {
                    label: 'Status',
                    render: (row) => (
                      <Badge variant="secondary">{row.status}</Badge>
                    ),
                  },
                ]}
                itemLabel="items"
                loading={false}
                onPage={setPage}
                page={tablePage}
                pages={tablePages}
                pageSize={2}
                rows={rows}
                searchBar={(
                  <div className="mb-3 flex flex-wrap items-end gap-2">
                    <div className="min-w-48 flex-1 space-y-1">
                      <Label htmlFor="design-system-table-search">Search</Label>
                      <div className="relative">
                        <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          id="design-system-table-search"
                          onChange={(event) => { setTableSearch(event.target.value); setPage(1); }}
                          placeholder="Search items..."
                          value={tableSearch}
                        />
                      </div>
                    </div>
                    <div className="min-w-36 space-y-1">
                      <Label>Status</Label>
                      <FilterSelect
                        ariaLabel="Filter table by status"
                        onChange={(value) => { setTableStatus(value); setPage(1); }}
                        options={[
                          { value: 'all', label: 'All statuses' },
                          { value: 'active', label: 'Active' },
                          { value: 'draft', label: 'Draft' },
                        ]}
                        value={tableStatus}
                      />
                    </div>
                    <div className="min-w-36 space-y-1">
                      <Label>Sort</Label>
                      <FilterSelect
                        ariaLabel="Sort table rows"
                        onChange={(value) => { setTableSort(value); setPage(1); }}
                        options={[
                          { value: 'name', label: 'Name' },
                          { value: 'status', label: 'Status' },
                        ]}
                        value={tableSort}
                      />
                    </div>
                  </div>
                )}
                selectedIds={selectedRows}
                onSelectedIdsChange={setSelectedRows}
                total={filteredRows.length}
              />
            </div>
          </Showcase>

          <Showcase
            name="Notification"
            description={descriptions[language].Notification}
          >
            <div className="space-y-3">
              <Notification payload={{ type: 'success', message: 'Observation changes were saved successfully.' }} />
              <Notification payload={{ type: 'error', message: 'Observation changes could not be saved.' }} />
            </div>
          </Showcase>

          <Showcase
            name="Empty List"
            description={descriptions[language].EmptyList}
          >
            <EmptyList />
          </Showcase>

          <Showcase
            className="lg:col-span-2"
            name="Dialog"
            description={descriptions[language].Dialog}
          >
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setEntityOpen(true)}>
                <Plus /> Open form modal
              </Button>
              <Button className="border-primary bg-transparent text-primary hover:bg-transparent hover:text-primary" onClick={() => setConfirmOpen(true)} variant="outline">
                <CheckCircle2 /> Open confirm dialog
              </Button>
              <Button onClick={() => setWarnOpen(true)} variant="outline">
                <AlertTriangle /> Open warning dialog
              </Button>
              <Button
                onClick={() => setDeleteOpen(true)}
                variant="destructive"
              >
                <Trash2 /> Open delete dialog
              </Button>
            </div>
            <EntityDialog
              description="A reusable modal with a real application form."
              onClose={() => setEntityOpen(false)}
              open={entityOpen}
              title="Add observation"
            >
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="design-system-modal-name">
                      Observation label <span className="text-destructive">*</span>
                    </Label>
                    <Input id="design-system-modal-name" placeholder="Wireless keyboard" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="design-system-modal-inventory">
                      Year <span className="text-destructive">*</span>
                    </Label>
                    <Input id="design-system-modal-inventory" placeholder="2025" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <FilterSelect
                      ariaLabel="Observation category"
                      onChange={setEntityCategory}
                      options={[
                        { value: 'numeric', label: 'Numeric' },
                        { value: 'time-axis', label: 'Time axis' },
                      ]}
                      value={entityCategory}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="design-system-modal-price">
                      Value <span className="text-destructive">*</span>
                    </Label>
                    <Input id="design-system-modal-price" min="0" placeholder="99.00" step="0.01" type="number" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="design-system-modal-quantity">
                      Precision <span className="text-destructive">*</span>
                    </Label>
                    <Input id="design-system-modal-quantity" min="0" placeholder="20" type="number" />
                  </div>
                  <div className="grid gap-2 sm:col-span-2">
                    <Label htmlFor="design-system-modal-sku">Source key</Label>
                    <Input id="design-system-modal-sku" placeholder="source" />
                  </div>
                </div>
                <Button onClick={() => setEntityOpen(false)}>
                  <Plus /> Add observation
                </Button>
              </div>
            </EntityDialog>
            <ConfirmDialog
              labels={{
                title: 'Confirm action',
                description: 'Continue with {{name}}?',
                note: 'You can review the result after completion.',
                cancel: 'Cancel',
                pending: 'Confirming…',
                confirm: 'Confirm',
              }}
              busy={false}
              itemName="this operation"
              onClose={() => setConfirmOpen(false)}
              onConfirm={() => setConfirmOpen(false)}
              open={confirmOpen}
              tone="confirm"
            />
            <ConfirmDialog
              labels={{
                title: 'Confirm reset',
                description: 'Reset {{name}}?',
                warning: 'This will remove its current data.',
                cancel: 'Cancel',
                pending: 'Resetting…',
                confirm: 'Reset',
              }}
              busy={false}
              itemName="this source"
              onClose={() => setWarnOpen(false)}
              onConfirm={() => setWarnOpen(false)}
              open={warnOpen}
              tone="warn"
            />
            <ConfirmDialog
              labels={confirmDialogLabels(t)}
              busy={false}
              itemName="Observation"
              onClose={() => setDeleteOpen(false)}
              onConfirm={() => setDeleteOpen(false)}
              open={deleteOpen}
            />
          </Showcase>

        </div>
      </section>
    </div>
  );
}

function Showcase({
  name,
  description,
  children,
  className = '',
}: {
  name: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle className="font-mono text-lg">{name}</CardTitle>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-24 flex-wrap items-center gap-3 rounded-lg border bg-muted/20 p-4">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
