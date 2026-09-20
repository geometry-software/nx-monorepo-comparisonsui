import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@nx-react-nestjs/components/app/app-shell';
import { useRequestActivity } from './request-activity';
import { useI18n } from './i18n';

const Info = lazy(() =>
  import('../pages/info').then(({ Info }) => ({ default: Info })),
);
const ProjectInfo = lazy(() =>
  import('../pages/swagger').then(({ ProjectInfo }) => ({
    default: ProjectInfo,
  })),
);
const Installation = lazy(() =>
  import('../pages/installation').then(({ Installation }) => ({
    default: Installation,
  })),
);
const DesignSystem = lazy(() =>
  import('../pages/design-system').then(({ DesignSystem }) => ({
    default: DesignSystem,
  })),
);
const Series = lazy(() =>
  import('../pages/series').then(({ Series }) => ({ default: Series })),
);
const Comparisons = lazy(() =>
  import('../pages/comparisons').then(({ Comparisons }) => ({ default: Comparisons })),
);
const Insights = lazy(() =>
  import('../pages/insights').then(({ Insights }) => ({ default: Insights })),
);
export function App() {
  const { language, setLanguage, t } = useI18n();
  const requestActivity = useRequestActivity();
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center text-muted-foreground">
          {t('app.loading')}
        </div>
      }
    >
      <Routes>
        <Route
          element={
            <AppShell
              i18n={{
                language,
                setLanguage,
                t: (key, values) => t(key as never, values),
              }}
              requestActivity={requestActivity}
            />
          }
        >
          <Route
            index
            element={
              <Navigate
                to="/series"
                replace
              />
            }
          />
          <Route path="info" element={<Info />} />
          <Route path="swagger" element={<ProjectInfo />} />
          <Route path="installation" element={<Installation />} />
          <Route
            path="project-info"
            element={<Navigate to="/swagger" replace />}
          />
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="series" element={<Series />} />
          <Route path="comparisons" element={<Comparisons />} />
          <Route path="insights" element={<Insights />} />
          <Route
            path="storybook"
            element={<Navigate to="/design-system" replace />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;
