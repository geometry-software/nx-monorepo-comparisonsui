import { lazy, type ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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
  import('../pages/comparisons').then(({ Comparisons }) => ({
    default: Comparisons,
  })),
);
const Insights = lazy(() =>
  import('../pages/insights').then(({ Insights }) => ({ default: Insights })),
);
const Users = lazy(() =>
  import('../pages/users').then(({ Users }) => ({ default: Users })),
);
const Account = lazy(() =>
  import('../pages/account').then(({ Account }) => ({ default: Account })),
);

export function Nav({ shell }: { shell: ReactNode }) {
  return (
    <Routes>
      <Route element={shell}>
        <Route index element={<Navigate to="/series" replace />} />
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
        <Route path="users" element={<Users />} />
        <Route path="account" element={<Account />} />
        <Route
          path="storybook"
          element={<Navigate to="/design-system" replace />}
        />
      </Route>
    </Routes>
  );
}
