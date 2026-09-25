import type { ReactNode } from "react";
import { CalendarDays, Cpu, Database } from "lucide-react";
import { TabsList, TabsTrigger } from "@cui/ui/components";

const tabs = [
  {
    value: "sources",
    title: "Sources",
    description: "Select sources to group into a server.",
    icon: Database,
  },
  {
    value: "period",
    title: "Periods",
    description: "Build a set of years or calendar days.",
    icon: CalendarDays,
  },
  {
    value: "compute",
    title: "Servers",
    description: "Manage services and track compute activity.",
    icon: Cpu,
  },
] as const;

export function DataSourceTabBar({ actions }: { actions: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <TabsList
        className="flex w-full flex-wrap items-stretch justify-start gap-2 bg-transparent p-0 xl:w-auto"
        style={{ height: "auto" }}
        variant="line"
      >
        {tabs.map(({ value, title, description, icon: Icon }) => (
          <TabsTrigger
            className="min-w-44 max-w-56 flex-none flex-col items-start justify-start gap-1 rounded-lg border border-border px-3 py-2.5 text-left data-active:border-primary data-active:bg-primary/5 after:hidden"
            key={value}
            style={{ height: "auto", whiteSpace: "normal" }}
            value={value}
          >
            <span className="flex items-center gap-2 font-semibold">
              <Icon aria-hidden="true" className="size-4" /> {title}
            </span>
            <span className="text-xs font-normal leading-snug text-muted-foreground">{description}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex flex-wrap items-start justify-start gap-2">{actions}</div>
    </div>
  );
}
