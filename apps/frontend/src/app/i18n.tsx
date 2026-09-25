import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  accountEnglishMessages,
  accountTranslations,
} from '@cui/account/translations';

export type Language = 'en' | 'es' | 'pt';

const englishMessages = {
  'language.label': 'Language',
  'nav.project': 'Project Info',
  'nav.dataSources': 'Data Sources',
  'nav.comparisons': 'Comparisons',
  'nav.insights': 'Insights',
  'nav.info': 'Data Flow',
  'nav.installation': 'Installation',
  'nav.designSystem': 'Design System',
  'header.catalog': 'Correlation analysis',
  'header.console': 'Console View',
  'header.dataSources': 'Data Sources',
  'header.lastRequest': 'Last request ({{method}}) · {{duration}} ms',
  'header.requestInProgress': '{{method}} service request in progress: {{duration}} ms',
  'header.requestCompleted': '{{method}} service request completed in {{duration}} ms',
  'header.project': 'Project Info',
  'header.overview': 'Data Flow',
  'header.components': 'Design System',
  'common.cancel': 'Cancel',
  'common.deleteConfirmTitle': 'Confirm deletion',
  'common.deleteConfirmDescription': 'Are you sure you want to delete “{{name}}”?',
  'common.deleteWarning': 'This action cannot be undone.',
  'common.confirmDelete': 'Delete permanently',
  'common.deleting': 'Deleting…',
  'table.empty': 'No data is available.',
  'table.showing': 'Showing {{first}} to {{last}} of {{total}} {{items}}',
  'table.previous': 'Previous',
  'table.next': 'Next',
  'table.pagination': 'Pagination',
  'table.goToPage': 'Go to page {{page}}',
  'table.selectAll': 'Select all rows',
  'table.selectRow': 'Select row {{id}}',
  'info.swaggerTab': 'Swagger',
  'info.swaggerDescription': 'Interactive API documentation for Data Sources, Comparisons, and Auth.',
  'info.swaggerTitle': 'Service APIs',
  'installation.eyebrow': 'Getting started',
  'installation.title': 'Installation guide',
  'installation.subtitle': 'Configure the workspace and start the correlation services.',
  'installation.stepNode': 'Install Node.js',
  'installation.stepNodeText': 'Install Node.js 22.22.3 or newer from the official download page.',
  'installation.stepClone': 'Download the repository',
  'installation.stepCloneText': 'Clone the repository or download and extract its ZIP archive.',
  'installation.stepStartAll': 'Start the workspace',
  'installation.stepStartAllText': 'From the repository root, run npm start to launch the frontend and backend APIs.',
  'designSystem.eyebrow': 'Interface foundation',
  'designSystem.title': 'Design System',
  'designSystem.subtitle': 'Reusable application components shared by the correlation interface. Interact with each component to inspect its states and behavior.',
  'designSystem.componentsCount': '{{count}} React Components',
  ...accountEnglishMessages,
  'app.loading': 'Loading…',
} as const;

export type TranslationKey = keyof typeof englishMessages;

const messages: Record<Language, Record<TranslationKey, string>> = {
  en: englishMessages,
  es: {
    ...englishMessages,
    'language.label': 'Idioma',
    'nav.project': 'Información del proyecto',
    'nav.info': 'Flujo de datos',
    'nav.installation': 'Instalación',
    'nav.designSystem': 'Sistema de diseño',
    'nav.dataSources': 'Fuentes de datos',
    'nav.comparisons': 'Comparaciones',
    'nav.insights': 'Hallazgos',
    'header.catalog': 'Análisis de correlación',
    'header.console': 'Vista de consola',
    'header.dataSources': 'Fuentes de datos',
    'header.project': 'Información del proyecto',
    'header.overview': 'Flujo de datos',
    'header.components': 'Sistema de diseño',
    'installation.title': 'Guía de instalación',
    'designSystem.title': 'Sistema de diseño',
    ...accountTranslations.es,
    'app.loading': 'Cargando…',
  },
  pt: {
    ...englishMessages,
    'language.label': 'Idioma',
    'nav.project': 'Informações do projeto',
    'nav.info': 'Fluxo de dados',
    'nav.installation': 'Instalação',
    'nav.designSystem': 'Sistema de design',
    'nav.dataSources': 'Fontes de dados',
    'nav.comparisons': 'Comparações',
    'nav.insights': 'Insights',
    'header.catalog': 'Análise de correlação',
    'header.console': 'Visão do console',
    'header.dataSources': 'Fontes de dados',
    'header.project': 'Informações do projeto',
    'header.overview': 'Fluxo de dados',
    'header.components': 'Sistema de design',
    'installation.title': 'Guia de instalação',
    'designSystem.title': 'Sistema de design',
    ...accountTranslations.pt,
    'app.loading': 'Carregando…',
  },
};

export type I18nValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

export function tableLabels(t: I18nValue['t']) {
  return {
    showing: t('table.showing', { first: '{{first}}', last: '{{last}}', total: '{{total}}', items: '{{items}}' }),
    pagination: t('table.pagination'),
    previous: t('table.previous'),
    next: t('table.next'),
    goToPage: (page: number) => t('table.goToPage', { page }),
    selectAll: t('table.selectAll'),
    selectRow: (id: string) => t('table.selectRow', { id }),
  };
}

export function confirmDialogLabels(t: I18nValue['t']) {
  return {
    title: t('common.deleteConfirmTitle'),
    description: t('common.deleteConfirmDescription', { name: '{{name}}' }),
    warning: t('common.deleteWarning'),
    cancel: t('common.cancel'),
    deleting: t('common.deleting'),
    confirmDelete: t('common.confirmDelete'),
  };
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('nx-language');
    return stored === 'es' || stored === 'pt' ? stored : 'en';
  });

  useEffect(() => {
    localStorage.setItem('nx-language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  }, [language]);

  const value = useMemo<I18nValue>(() => ({
    language,
    setLanguage,
    t: (key, values = {}) => Object.entries(values).reduce(
      (text, [name, replacement]) => text.split(`{{${name}}}`).join(String(replacement)),
      messages[language][key] ?? messages.en[key] ?? key,
    ),
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
