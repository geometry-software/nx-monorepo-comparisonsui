import {
  ArrowDown,
  ArrowRight,
  Blocks,
  Braces,
  ChartNoAxesCombined,
  Database,
  ExternalLink,
  GitCompareArrows,
  ListTree,
  Server,
  TableProperties,
} from 'lucide-react';

const entityServices = [
  { name: 'Year', port: '3010', database: 'nm_years' },
  { name: 'TGI', port: '3012', database: 'nm_tgi' },
];

const comparisons = [
  { pair: 'Year–TGI', purpose: 'Measures the direction and strength of the linear TGI trend across the shared years.' },
];

export function CorrelationArchitecture({
  correlationCodeUrl,
  orchestratorCodeUrl,
}: {
  correlationCodeUrl: string;
  orchestratorCodeUrl: string;
}) {
  return (
    <div className="space-y-5" role="img" aria-label="Correlation services architecture">
      <section className="rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
        <Heading icon={Braces} title="React analysis console" description="Forms write observations, lists render collections, and Insights reads stored comparisons." />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <FrontendModule
            icon={ListTree}
            title="Data Sources"
            description="Select Year or TGI and work with its independent collection."
          />
          <FrontendModule
            icon={TableProperties}
            title="Comparisons"
            description="Render the stored Year–TGI pair, its shared-year coverage, and Pearson R value."
          />
          <FrontendModule
            icon={ChartNoAxesCombined}
            title="Insights"
            description="Show correlation strength, matrix, aligned trends, and evidence coverage in four charts."
          />
          <FrontendModule
            icon={Blocks}
            title="Shared Components"
            description="Reuse forms, tables, dialogs, cards, controls, and correlation visualizations from one package."
          />
        </div>
      </section>

      <Flow label="HTTP · RTK Query" />

      <section className="rounded-2xl border border-violet-200 bg-violet-50/60 p-5">
        <Heading icon={Server} title="Independent Node REST Services" description="All backend services remain inside one layer, separated by persistence and orchestration responsibility." />

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,1fr)]">
          <section>
            <Heading icon={Database} title="TypeORM entity services" description="Year and TGI expose independent REST APIs and persist their own observations." compact />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {entityServices.map((service) => (
                <article className="rounded-lg border border-violet-200 bg-background p-3" key={service.name}>
                  <div className="flex items-center justify-between gap-2">
                    <strong>{service.name}</strong>
                    <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">:{service.port}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">TypeORM entity · REST CRUD</p>
                  <table className="mt-2 w-full overflow-hidden rounded-md border border-violet-100 bg-white text-[10px] leading-4 text-black">
                    <tbody>
                      <tr className="border-b border-violet-100">
                        <th className="w-[38%] px-2 py-1 text-left font-medium">provider</th>
                        <td className="px-2 py-1 text-left">Atlas MongoDB Cloud</td>
                      </tr>
                      <tr>
                        <th className="px-2 py-1 text-left font-medium">collection</th>
                        <td className="px-2 py-1 text-left"><code className="text-[10px] text-black">{service.database}</code></td>
                      </tr>
                    </tbody>
                  </table>
                </article>
              ))}
            </div>
          </section>

          <section className="border-violet-200 xl:border-l xl:pl-5">
            <Heading icon={GitCompareArrows} title="Orchestration service" description="Comparison Orchestrator coordinates the calculation." compact />
            <div className="mt-4 grid gap-3">
              <ServiceCard icon={GitCompareArrows} title="Comparison Orchestrator" port="3017" description="Fetches Year and TGI over internal REST and stores the comparison snapshot in nm_comparisons." />
            </div>

            <Flow label="Internal function calls" compact />

            <article className="rounded-xl border-2 border-violet-300 bg-background p-4">
              <div className="flex items-center gap-2"><ChartNoAxesCombined className="size-5 text-violet-700" /><strong>Correlation Pipeline</strong></div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Internal application logic—not an external API. It maps Year to its numeric value, aligns Year and TGI observations, and calculates Pearson R.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <CodeLink href={correlationCodeUrl}>Pipeline code</CodeLink>
                <CodeLink href={orchestratorCodeUrl}>Orchestrator code</CodeLink>
              </div>
            </article>
          </section>
        </div>
      </section>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'minmax(220px, 1fr) minmax(0, 3fr)' }}>
        <div><Flow label="2 independent TypeORM connections" compact /></div>
        <div><Flow label="Correlation Pipeline emits 1 comparison coefficient" compact /></div>
      </div>

      <div className="grid items-start gap-5" style={{ gridTemplateColumns: 'minmax(220px, 1fr) minmax(0, 3fr)' }}>
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <Heading icon={Database} title="Entity persistence" description="One green persistence boundary for the two TypeORM entity services." compact />
          <div className="mt-4">
          <article className="rounded-xl border border-emerald-300 bg-background p-5 text-center">
            <Database className="mx-auto size-6 text-emerald-700" />
            <strong className="mt-3 block text-lg">MongoDB Atlas</strong>
            <p className="mt-2 text-sm text-muted-foreground">Year and TGI connect to the same Atlas cluster while retaining separate collections and ownership boundaries.</p>
            <div className="mt-3 grid gap-1.5 text-left">
              {entityServices.map(({ name, database }) => (
                <div className="flex items-center justify-between gap-2 rounded-md bg-emerald-50 px-2 py-1.5 text-xs" key={database}>
                  <span className="font-medium">{name}</span>
                  <code>{database}</code>
                </div>
              ))}
            </div>
          </article>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
          <Heading icon={GitCompareArrows} title="Pearson comparison coefficient" description="The card represents the unique pair generated by the Correlation Pipeline." compact />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {comparisons.map(({ pair, purpose }, index) => (
                <article className="rounded-lg border border-emerald-200 bg-background p-3" key={pair}>
                  <div className="flex items-center justify-between gap-2"><strong>{pair}</strong><span className="text-xs font-medium text-emerald-700">R{index + 1}</span></div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{purpose}</p>
                </article>
              ))}
            </div>
        </section>
      </div>
    </div>
  );
}

function Heading({ icon: Icon, title, description, compact = false }: { icon: typeof Server; title: string; description: string; compact?: boolean }) {
  return <div className="flex items-start gap-3"><Icon className="mt-0.5 size-5 shrink-0" /><div><h2 className={compact ? 'font-semibold' : 'text-lg font-semibold'}>{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div></div>;
}

function ServiceCard({ icon: Icon, title, port, description }: { icon: typeof Server; title: string; port: string; description: string }) {
  return <article className="rounded-lg border border-violet-200 bg-background p-3"><div className="flex items-center gap-2"><Icon className="size-4 text-violet-700" /><strong>{title}</strong><span className="ml-auto rounded-full border px-2 py-0.5 text-xs text-muted-foreground">:{port}</span></div><p className="mt-2 text-xs text-muted-foreground">{description}</p></article>;
}

function FrontendModule({ icon: Icon, title, description }: { icon: typeof Server; title: string; description: string }) {
  return <article className="rounded-xl border border-blue-200 bg-background p-4 text-center"><Icon className="mx-auto size-5 text-blue-700" /><strong className="mt-3 block">{title}</strong><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p></article>;
}

function Flow({ label, compact = false }: { label: string; compact?: boolean }) {
  return <div className={compact ? 'flex h-14 flex-col items-center justify-center' : 'flex h-16 flex-col items-center justify-center'}><ArrowDown className="size-5 text-muted-foreground" /><span className="text-center text-xs font-medium text-muted-foreground">{label}</span></div>;
}

function CodeLink({ href, children }: { href: string; children: string }) {
  return <a className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-muted" href={href} target="_blank" rel="noreferrer"><ArrowRight className="size-3.5" />{children}<ExternalLink className="size-3 text-muted-foreground" /></a>;
}
