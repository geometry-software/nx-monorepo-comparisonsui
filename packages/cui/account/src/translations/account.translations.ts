export type AccountTranslationLanguage = "en" | "es" | "pt";

export const accountEnglishMessages = {
  "nav.session": "Session",
  "nav.users": "Users",
  "nav.account": "Account",
  "header.session": "Session",
  "header.users": "Users",
  "header.account": "Account",
  "account.title": "Account",
  "account.description":
    "Session management combines Firebase Auth for fast anonymous identity creation and token verification with Supabase for PostgreSQL-backed storage through a simple data API. Each session is stored as a PostgreSQL row that brings together its application ID, provider identity, and lifecycle timestamps from creation through verification and closure.",
  "account.supabaseDescription":
    "Stores session identity and lifecycle timestamps.",
  "account.firebaseDescription":
    "Creates session tokens and verifies active accounts.",
  "account.projectRef": "Project ref",
  "account.projectId": "Project ID",
  "account.statusConnecting": "Connecting",
  "account.statusConnected": "Connected",
  "account.statusDisconnected": "Disconnected",
  "account.sessionStartup": "Session Startup",
  "account.connect": "Connect",
  "account.startupDescription":
    "Supabase and Firebase must both be connected before a session can be created. The new Firebase identity will be linked to a Supabase session row that records its application ID and lifecycle from creation through verification and closure.",
  "account.createInstruction": "Click Create session to continue.",
  "account.session": "Session",
  "account.sessionDescription": "Application session requested from SQL.",
  "account.timestamp": "Timestamp",
  "account.verifiedDescription":
    "WebSocket connection verified via a session token.",
  "account.verify": "Verify",
  "account.verifyDescription":
    "Verifies the Firebase identity and updates its latest verification time in Supabase.",
  "account.verifyInstruction": "Click Verify Session to continue.",
  "account.createSession": "Create session",
  "account.creating": "Creating…",
  "account.verifySession": "Verify Session",
  "account.verifying": "Verifying…",
  "account.closeSession": "Close session",
  "account.closing": "Closing…",
  "account.connectProviders": "Connect all providers",
  "account.sessionReceived": "Session received",
  "account.sessionVerified": "Session verified",
  "account.sessionNotVerified": "Session not verified",
  "account.restoreError": "Unable to restore the active session.",
  "account.createError": "Unable to create a session.",
  "account.verifyError": "Unable to verify the session.",
  "account.closeError": "Unable to close the session.",
} as const;

export type AccountTranslationKey = keyof typeof accountEnglishMessages;

export const accountTranslations: Record<
  AccountTranslationLanguage,
  Record<AccountTranslationKey, string>
> = {
  en: accountEnglishMessages,
  es: {
    ...accountEnglishMessages,
    "nav.session": "Sesión",
    "nav.users": "Usuarios",
    "nav.account": "Cuenta",
    "header.session": "Sesión",
    "header.users": "Usuarios",
    "header.account": "Cuenta",
    "account.title": "Cuenta",
    "account.description":
      "La gestión de sesiones combina Firebase Auth para crear identidades anónimas y verificar tokens rápidamente con Supabase para almacenar datos en PostgreSQL mediante una API sencilla. Cada sesión se guarda como una fila que reúne su identificador de aplicación, la identidad del proveedor y las fechas de su ciclo de vida, desde la creación hasta la verificación y el cierre.",
    "account.supabaseDescription":
      "Almacena la identidad y las fechas del ciclo de vida de la sesión.",
    "account.firebaseDescription":
      "Crea tokens de sesión y verifica cuentas activas.",
    "account.projectRef": "Referencia del proyecto",
    "account.projectId": "ID del proyecto",
    "account.statusConnecting": "Conectando",
    "account.statusConnected": "Conectado",
    "account.statusDisconnected": "Desconectado",
    "account.sessionStartup": "Inicio de sesión",
    "account.connect": "Conectar",
    "account.startupDescription":
      "Supabase y Firebase deben estar conectados antes de crear una sesión. La nueva identidad de Firebase se vinculará a una fila de sesión en Supabase que registra su identificador de aplicación y su ciclo de vida desde la creación hasta la verificación y el cierre.",
    "account.createInstruction": "Pulsa Crear sesión para continuar.",
    "account.session": "Sesión",
    "account.sessionDescription":
      "Sesión de aplicación solicitada desde SQL.",
    "account.timestamp": "Marca temporal",
    "account.verifiedDescription":
      "Conexión WebSocket verificada mediante un token de sesión.",
    "account.verify": "Verificar",
    "account.verifyDescription":
      "Verifica la identidad de Firebase y actualiza en Supabase la fecha de verificación más reciente.",
    "account.verifyInstruction":
      "Pulsa Verificar sesión para continuar.",
    "account.createSession": "Crear sesión",
    "account.creating": "Creando…",
    "account.verifySession": "Verificar sesión",
    "account.verifying": "Verificando…",
    "account.closeSession": "Cerrar sesión",
    "account.closing": "Cerrando…",
    "account.connectProviders": "Conecta todos los proveedores",
    "account.sessionReceived": "Sesión recibida",
    "account.sessionVerified": "Sesión verificada",
    "account.sessionNotVerified": "Sesión no verificada",
  },
  pt: {
    ...accountEnglishMessages,
    "nav.session": "Sessão",
    "nav.users": "Usuários",
    "nav.account": "Conta",
    "header.session": "Sessão",
    "header.users": "Usuários",
    "header.account": "Conta",
    "account.title": "Conta",
    "account.description":
      "O gerenciamento de sessões combina o Firebase Auth para criar identidades anônimas e verificar tokens rapidamente com o Supabase para armazenar dados no PostgreSQL por meio de uma API simples. Cada sessão é armazenada como uma linha que reúne seu identificador da aplicação, a identidade do provedor e as datas do ciclo de vida, desde a criação até a verificação e o encerramento.",
    "account.supabaseDescription":
      "Armazena a identidade e as datas do ciclo de vida da sessão.",
    "account.firebaseDescription":
      "Cria tokens de sessão e verifica contas ativas.",
    "account.projectRef": "Referência do projeto",
    "account.projectId": "ID do projeto",
    "account.statusConnecting": "Conectando",
    "account.statusConnected": "Conectado",
    "account.statusDisconnected": "Desconectado",
    "account.sessionStartup": "Início da sessão",
    "account.connect": "Conectar",
    "account.startupDescription":
      "Supabase e Firebase devem estar conectados antes da criação de uma sessão. A nova identidade do Firebase será vinculada a uma linha de sessão no Supabase que registra o identificador da aplicação e o ciclo de vida desde a criação até a verificação e o encerramento.",
    "account.createInstruction": "Clique em Criar sessão para continuar.",
    "account.session": "Sessão",
    "account.sessionDescription":
      "Sessão da aplicação solicitada pelo SQL.",
    "account.timestamp": "Registro de data",
    "account.verifiedDescription":
      "Conexão WebSocket verificada por um token de sessão.",
    "account.verify": "Verificar",
    "account.verifyDescription":
      "Verifica a identidade do Firebase e atualiza no Supabase a data da verificação mais recente.",
    "account.verifyInstruction":
      "Clique em Verificar sessão para continuar.",
    "account.createSession": "Criar sessão",
    "account.creating": "Criando…",
    "account.verifySession": "Verificar sessão",
    "account.verifying": "Verificando…",
    "account.closeSession": "Encerrar sessão",
    "account.closing": "Encerrando…",
    "account.connectProviders": "Conecte todos os provedores",
    "account.sessionReceived": "Sessão recebida",
    "account.sessionVerified": "Sessão verificada",
    "account.sessionNotVerified": "Sessão não verificada",
  },
};
