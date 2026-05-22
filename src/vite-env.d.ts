/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_BUSINESS_PROFILE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
