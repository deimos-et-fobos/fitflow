/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string; // <- Acá poné todas tus variables
    VITE_ALLOWED_HOSTS: string;
    // pon acá cuantas VITE_… uses
}

interface ImportMeta {
    env: ImportMetaEnv;
}