import { BookOpen, Database, GitCompareArrows } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@cui/ui/components';
import { useI18n } from '../app/i18n';
import { getServiceUrl, type ServiceName } from '../services/service-location';

const swaggerServices: ReadonlyArray<{
  service: ServiceName;
  label: string;
  port: number;
  database: string;
  kind: 'source' | 'orchestrator';
}> = [
  { service: 'years', label: 'Year', port: 3010, database: 'nm_years', kind: 'source' },
  { service: 'tgi', label: 'TGI', port: 3012, database: 'nm_tgi', kind: 'source' },
  { service: 'comparisons', label: 'Comparisons', port: 3017, database: 'nm_comparisons', kind: 'orchestrator' },
];

export function ProjectInfo() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen />
          </span>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {t('info.swaggerTab')}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {t('info.swaggerDescription')}
            </p>
          </div>
        </div>
      </header>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{t('info.swaggerTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="years">
            <TabsList className="mb-4 grid h-auto w-full grid-cols-3 gap-1">
              {swaggerServices.map(({ service, label }) => (
                <TabsTrigger key={service} value={service}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            {swaggerServices.map((service) => (
              <SwaggerFrame key={service.service} {...service} />
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function SwaggerFrame({
  service,
  label,
  port,
  database,
  kind,
}: {
  service: ServiceName;
  label: string;
  port: number;
  database: string;
  kind: 'source' | 'orchestrator';
}) {
  const Icon = kind === 'orchestrator' ? GitCompareArrows : Database;

  return (
    <TabsContent value={service}>
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-lg border bg-muted/35 px-3 py-2 text-sm">
        <span className="flex items-center gap-2 font-medium">
          <Icon className="size-4 text-primary" />
          {label} {kind === 'orchestrator' ? 'orchestrator' : 'data source'}
        </span>
        <span className="rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
          localhost:{port}
        </span>
        <code className="rounded bg-background px-2 py-0.5 text-xs">{database}</code>
      </div>
      <iframe
        className="h-[min(72vh,760px)] w-full rounded-lg border bg-background"
        src={getServiceUrl(service, '/docs')}
        title={`${label} Swagger UI`}
      />
    </TabsContent>
  );
}
