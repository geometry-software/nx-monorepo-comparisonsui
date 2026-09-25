import { BookOpen } from 'lucide-react';
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
}> = [
  { service: 'dataSources', label: 'Data Sources' },
  { service: 'comparisons', label: 'Comparisons' },
  { service: 'auth', label: 'Auth' },
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
          <Tabs defaultValue="dataSources">
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
}: {
  service: ServiceName;
  label: string;
}) {
  return (
    <TabsContent value={service}>
      <iframe
        className="h-[min(72vh,760px)] w-full rounded-lg border bg-background"
        src={getServiceUrl(service, '/docs')}
        title={`${label} Swagger UI`}
      />
    </TabsContent>
  );
}
