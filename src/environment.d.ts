declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URI: string
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_MINIO_HOSTNAME: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      MINIO_ENDPOINT: string
      MINIO_ACCESS_KEY: string
      MINIO_SECRET_ACCESS_KEY: string
      MINIO_BUCKET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
