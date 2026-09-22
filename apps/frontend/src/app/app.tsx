import { Suspense } from 'react';
import { AppShell, Toaster } from '@cui/ui/components';
import { useRequestActivity } from '../services/request-activity';
import { useI18n } from './i18n';
import { Nav } from './nav';

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
      <>
        <Nav
          shell={
            <AppShell
              i18n={{
                language,
                setLanguage,
                t: (key, values) => t(key as never, values),
              }}
              requestActivity={requestActivity}
            />
          }
        />
        <Toaster position="top-right" />
      </>
    </Suspense>
  );
}
export default App;
