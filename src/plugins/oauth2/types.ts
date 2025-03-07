export type OAuth2Provider = 'google' | 'github' | 'discord'

export type OAuth2Config = {
  authorizeHost: string
  authorizePath: string
  tokenHost: string
  tokenPath: string
}

export type OAuth2PluginOptions = {
  enabled?: boolean
  serverURL?: string
  clientId: string
  clientSecret: string
  scopes: string[]
  provider: OAuth2Provider
  accessType?: 'offline' | 'online'
  responseType?: 'code' | 'token'
  configuration?: OAuth2Config
}