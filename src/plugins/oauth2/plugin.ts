import { Plugin, Field } from 'payload'
import { OAuth2PluginOptions } from './types'

export const OAuth2Plugin =
  ({ enabled, ...opts }: OAuth2PluginOptions): Plugin =>
  (incommingConfig) => {
    const config = { ...incommingConfig }
    if (enabled === undefined) enabled = true
    if (!enabled) return config

    const userCollectionExists = config.collections?.find(
      (collection) => collection.slug === 'users',
    )
    if (!userCollectionExists) {
      throw new Error('OAuth2 plugin requires a users collection')
    }
    return incommingConfig
  }
