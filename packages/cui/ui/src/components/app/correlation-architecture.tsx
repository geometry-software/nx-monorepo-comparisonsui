import type { ReactNode } from 'react';
import {
  ArrowDown,
  Blocks,
  Cpu,
  Database,
  ExternalLink,
  FileCode2,
  Flame,
  GitCompareArrows,
  Globe2,
  Server,
  ShieldCheck,
} from 'lucide-react';

const services = [
  { icon: ShieldCheck, name: 'Auth Service', detail: 'Account sessions', port: '3015' },
  { icon: Database, name: 'Data Sources Service', detail: 'Sources, periods, computes', port: '3018' },
  { icon: GitCompareArrows, name: 'Comparison Service', detail: 'Correlation and saved comparisons', port: '3017' },
] as const;

const providers = [
  { icon: Flame, name: 'Firebase', detail: 'NoSQL collection' },
  { icon: Database, name: 'Supabase', detail: 'SQL table' },
  { icon: Database, name: 'MongoDB', detail: 'NoSQL collection' },
  { icon: Cpu, name: 'In-memory', detail: 'Runtime state' },
  { icon: FileCode2, name: 'Bump', detail: 'Computed file' },
] as const;
const frontendPages = [
  { icon: ShieldCheck, name: 'Account', detail: 'Session verification' },
  { icon: Database, name: 'Data Sources & Compute', detail: 'Sources, periods, and values' },
  { icon: GitCompareArrows, name: 'Comparisons & Insights', detail: 'Correlations and views' },
] as const;

const layerColors = {
  frontend: { border: '#4682B4', background: '#F0F8FF' },
  services: { border: 'var(--primary)', background: 'var(--background)' },
  providers: { border: '#228B22', background: '#F0FFF0' },
} as const;

export function CorrelationArchitecture({
  correlationCodeUrl,
  orchestratorCodeUrl,
}: {
  correlationCodeUrl: string;
  orchestratorCodeUrl: string;
}) {
  return (
    <div className="space-y-5">
      <figure aria-label="Data flow from the frontend through NestJS services to providers" className="rounded-2xl border bg-card p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
            <Blocks aria-hidden="true" className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold">NX Monorepo</h2>
            <p className="text-sm text-muted-foreground">Shared workspace for applications</p>
          </div>
        </div>

        <div className="mt-6">
          <ArchitectureLayer
            accent={layerColors.frontend.border}
            background={layerColors.frontend.background}
            icon={<Globe2 aria-hidden="true" className="size-5" />}
            title="React"
            subtitle="Frontend application"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {frontendPages.map(({ icon: Icon, name, detail }) => (
                <ArchitectureItem
                  key={name}
                  accent={layerColors.frontend.border}
                  icon={<Icon aria-hidden="true" className="size-5" />}
                  title={name}
                  detail={detail}
                />
              ))}
            </div>
          </ArchitectureLayer>

          <FlowArrow label="API requests" />

          <ArchitectureLayer
            accent={layerColors.services.border}
            background={layerColors.services.background}
            icon={<Server aria-hidden="true" className="size-5" />}
            title="NestJS"
            subtitle="Backend microservices"
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {services.map(({ icon: Icon, name, detail, port }) => (
                <ArchitectureItem
                  key={name}
                  accent={layerColors.services.border}
                  icon={<Icon aria-hidden="true" className="size-5" />}
                  title={name}
                  detail={detail}
                  aside={`:${port}`}
                />
              ))}
            </div>
          </ArchitectureLayer>

          <FlowArrow label="Provider access" />

          <ArchitectureLayer
            accent={layerColors.providers.border}
            background={layerColors.providers.background}
            icon={<Database aria-hidden="true" className="size-5" />}
            title="Providers"
            subtitle="Collection API for data access"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {providers.map(({ icon: Icon, name, detail }) => (
                <ArchitectureItem
                  key={name}
                  accent={layerColors.providers.border}
                  icon={<Icon aria-hidden="true" className="size-5" />}
                  title={name}
                  detail={detail}
                />
              ))}
            </div>
          </ArchitectureLayer>
        </div>
      </figure>
      <div className="flex flex-wrap gap-2">
        <CodeLink href={correlationCodeUrl}>Correlation algorithm</CodeLink>
        <CodeLink href={orchestratorCodeUrl}>Comparison service</CodeLink>
      </div>
    </div>
  );
}

function ArchitectureLayer({ accent, background, icon, title, subtitle, children }: {
  accent: string;
  background: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border p-4 sm:p-5" style={{ borderColor: accent, backgroundColor: background }}>
      <div className="mb-4 flex items-center gap-2" style={{ color: accent }}>
        {icon}
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ArchitectureItem({ accent, icon, title, detail, aside }: {
  accent: string;
  icon: ReactNode;
  title: string;
  detail?: string;
  aside?: string;
}) {
  return (
    <div
      className="flex min-h-28 min-w-0 flex-col items-center justify-center rounded-lg border bg-white p-3 text-center"
      style={{ borderColor: accent }}
    >
      <span className="mb-1" style={{ color: accent }}>{icon}</span>
      <h4 className="text-xs font-semibold leading-snug text-foreground">{title}</h4>
      {detail && <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{detail}</p>}
      {aside && <span className="mt-1 font-mono text-[10px] text-muted-foreground">{aside}</span>}
    </div>
  );
}

function FlowArrow({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 text-muted-foreground" aria-label={label}>
      <ArrowDown aria-hidden="true" className="size-5" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

function CodeLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-muted" href={href} target="_blank" rel="noreferrer">
      {children}<ExternalLink aria-hidden="true" className="size-3" />
    </a>
  );
}
