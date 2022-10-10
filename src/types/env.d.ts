/// <reference types="vite/client" />

export interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_BASE: string
  readonly APP_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
