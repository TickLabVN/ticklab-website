import { Endpoint } from 'payload'
import { OAuth2Config, OAuth2Provider, OAuth2PluginOptions } from './types'

const oauth2Configs: Record<OAuth2Provider, OAuth2Config> = {
  google: {
    authorizeHost: 'https://accounts.google.com',
    authorizePath: '/o/oauth2/v2/auth',
    tokenHost: 'https://www.googleapis.com',
    tokenPath: '/oauth2/v4/token'
  },
  github: {
    tokenHost: 'https://github.com',
    tokenPath: '/login/oauth/access_token',
    authorizeHost: 'https://github.com',
    authorizePath: '/login/oauth/authorize',
  },
  discord:  {
    authorizeHost: 'https://discord.com',
    authorizePath: '/api/oauth2/authorize',
    tokenHost: 'https://discord.com',
    tokenPath: '/api/oauth2/token',
  },
}

export const createOAuth2Endpoint = (opts: OAuth2PluginOptions): Endpoint => {
  const {
    clientId,
    clientSecret,
    scopes,
    provider,
    serverURL = process.env.NEXT_PUBLIC_SERVER_URL,
    accessType = 'offline',
    responseType = 'code',
    configuration = oauth2Configs[opts.provider],
  } = opts

  if (!clientId || !clientSecret) throw new Error('OAuth2 clientId and clientSecret are required')
  if (!scopes || scopes.length === 0) throw new Error('OAuth2 scopes are required')
  if (!provider) throw new Error('OAuth2 provider is required')

  return {
    method: 'get',
    path: `/auth/${provider}`,
    handler: async() => {
      const scope = scopes.join(' ')
  
      // Create a URL object and set search parameters
      const url = new URL(`${configuration.authorizeHost}${configuration.authorizePath}`)
      url.searchParams.append('client_id', clientId)
      url.searchParams.append('redirect_uri', `${serverURL}/oauth/${provider}/callback`)
      url.searchParams.append('scope', scope)
      url.searchParams.append('response_type', responseType)
      url.searchParams.append('access_type', accessType)
  
      return Response.redirect(url.toString())
    }
  }
}
