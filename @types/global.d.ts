export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  declare const __DEV__: boolean
  declare const GITHUB_URL: string

  declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
    }
  }
}
