/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URI: string,
    readonly VITE_DEFAULT_PASSWORD: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}