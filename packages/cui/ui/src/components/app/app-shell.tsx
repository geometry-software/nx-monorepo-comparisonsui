import {
  BookOpen,
  Boxes,
  CircleHelp,
  Download,
  FileCode2,
  Gauge,
  Activity,
  ChartNoAxesCombined,
  Database,
  KeyRound,
  CircleUserRound,
} from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { LanguageSwitcher } from './language-switcher';

export type RequestActivityView = {
  active: boolean;
  duration: number;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | null;
  visible: boolean;
};

const requestMethodStyles: Record<
  Exclude<RequestActivityView['method'], null>,
  string
> = {
  GET: 'border-blue-200 bg-blue-50 text-blue-700',
  DELETE: 'border-red-200 bg-red-50 text-red-700',
  POST: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  PUT: 'border-amber-200 bg-amber-50 text-amber-700',
  PATCH: 'border-[#90EE90] bg-[#F0FFF0] text-[#228B22]',
};

const navClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
  }`;

export function AppShell({
  requestActivity,
  i18n,
}: {
  requestActivity: RequestActivityView;
  i18n: {
    language: 'en' | 'es' | 'pt';
    setLanguage: (language: 'en' | 'es' | 'pt') => void;
    t: (key: string, values?: Record<string, string | number>) => string;
  };
}) {
  const location = useLocation();
  const { t } = i18n;
  const isInfo = location.pathname === '/info';
  const isProjectInfo =
    location.pathname === '/swagger' || location.pathname === '/installation';
  const isDesignSystem = location.pathname === '/design-system';
  const isTokens = location.pathname === '/tokens';
  const isAccount = location.pathname === '/account';
  const isDataSources = location.pathname === '/data-sources';
  const isSessionPage = isTokens || isAccount;
  const isProjectPage = isInfo || isProjectInfo || isDesignSystem;

  return (
    <div className="min-h-screen bg-muted/30 md:grid md:grid-cols-[304px_minmax(0,1fr)]">
      <aside className="border-b bg-background p-4 md:min-h-screen md:border-r md:border-b-0 md:p-0">
        <div className="md:flex md:h-16 md:items-center md:border-b md:px-4">
          <Brand />
        </div>
        <Separator className="my-5 md:hidden" />
        <nav className="grid gap-1 md:p-4" aria-label="Primary navigation">
          <NavGroup label={t('header.catalog')}>
            <NavLink className={navClass} to="/data-sources">
              <Database />
              {t('nav.dataSources')}
            </NavLink>
            <NavLink className={navClass} to="/comparisons">
              <Activity />
              {t('nav.comparisons')}
            </NavLink>
            <NavLink className={navClass} to="/insights">
              <ChartNoAxesCombined />
              {t('nav.insights')}
            </NavLink>
          </NavGroup>
          <NavGroup label={t('nav.session')}>
            <NavLink className={navClass} to="/tokens">
              <KeyRound />
              {t('nav.tokens')}
            </NavLink>
            <NavLink className={navClass} to="/account">
              <CircleUserRound />
              {t('nav.account')}
            </NavLink>
          </NavGroup>
          <NavGroup label={t('nav.project')}>
            <NavLink className={navClass} to="/installation">
              <Download />
              {t('nav.installation')}
            </NavLink>
            <NavLink className={navClass} to="/design-system">
              <BookOpen />
              {t('nav.designSystem')}
            </NavLink>
            <NavLink className={navClass} to="/info">
              <CircleHelp />
              {t('nav.info')}
            </NavLink>
            <NavLink className={navClass} to="/swagger">
              <FileCode2 />
              {t('info.swaggerTab')}
            </NavLink>
          </NavGroup>
        </nav>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b bg-background/95 px-4 backdrop-blur md:px-8">
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <Boxes className="text-primary" />
            <span>
              {t(
                isProjectPage
                  ? 'header.project'
                  : isSessionPage
                    ? 'header.session'
                    : 'header.catalog',
              )}
            </span>
            <span>/</span>
            <strong className="text-foreground">
              {t(
                isDataSources
                  ? 'header.dataSources'
                  : isTokens
                    ? 'header.tokens'
                    : isAccount
                      ? 'header.account'
                      : isDesignSystem
                        ? 'header.components'
                        : isInfo
                          ? 'header.overview'
                          : isProjectInfo
                            ? 'header.project'
                            : 'header.console',
              )}
            </strong>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              aria-label={
                requestActivity.visible
                  ? t(
                      requestActivity.active
                        ? 'header.requestInProgress'
                        : 'header.requestCompleted',
                      {
                        duration: requestActivity.duration,
                        method: requestActivity.method ?? 'GET',
                      },
                    )
                  : undefined
              }
              className={`flex h-8 gap-2 px-2.5 text-sm ${requestMethodStyles[requestActivity.method ?? 'GET']} ${requestActivity.active ? 'animate-pulse' : ''}`}
              variant="outline"
            >
              <Gauge />
              {requestActivity.visible &&
                t('header.lastRequest', {
                  duration: requestActivity.duration,
                  method: requestActivity.method ?? 'GET',
                })}
            </Badge>
            <LanguageSwitcher
              language={i18n.language}
              setLanguage={i18n.setLanguage}
              label={t('language.label')}
            />
          </div>
        </header>
        <main className="mx-auto max-w-7xl p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl bg-primary font-bold text-primary-foreground">
        NX
      </span>
      <strong className="whitespace-nowrap text-lg">Comparisons UI</strong>
    </div>
  );
}

function NavGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4 grid gap-1">
      <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}
