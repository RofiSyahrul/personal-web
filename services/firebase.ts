/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import path from 'path'
import admin from 'firebase-admin'

import defaultLinks from 'constants/links'

const firebaseServiceAccountPath = path.resolve(
  process.cwd(),
  'serviceAccount.json'
)

function cast(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function getLinks(
  remoteConfigParameters: Record<
    string,
    admin.remoteConfig.RemoteConfigParameter
  >
) {
  const { links } = remoteConfigParameters
  return cast((links?.defaultValue as any)?.value) ?? defaultLinks
}

export class AdminRemoteConfig {
  private remoteConfig: admin.remoteConfig.RemoteConfig = null

  private static _instance: AdminRemoteConfig = null

  constructor() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseServiceAccountPath),
      })
    }

    if (this.remoteConfig === null) {
      this.remoteConfig = admin.remoteConfig()
    }
  }

  static get instance(): AdminRemoteConfig {
    if (AdminRemoteConfig._instance) {
      return AdminRemoteConfig._instance
    }
    const instance = new AdminRemoteConfig()
    AdminRemoteConfig._instance = instance
    return instance
  }

  static async getLinks(): Promise<Record<string, string>> {
    const { remoteConfig } = AdminRemoteConfig.instance
    try {
      const { parameters } = await remoteConfig.getTemplate()
      if (parameters) {
        return getLinks(parameters)
      }
      return defaultLinks
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('GET LINKS ERROR', error)
      return defaultLinks
    }
  }
}
