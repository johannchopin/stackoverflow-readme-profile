import { writable } from 'svelte/store'
import type { Template } from '../../../../src/const'

export type TemplateSetting = 'boolean' | 'string'
export type TemplateSettings = {
  [key: string]: {
    type: TemplateSetting
    value: string | boolean
    editable?: boolean
  }
}
interface User {
  id?: number
  theme: string
  templates_settings: {
    [key in Template]: TemplateSettings
  }
}

const DEFAULT_USER: User = {
  theme: 'default',
  templates_settings: {
    'profile': {
      website: {
        type: 'boolean',
        value: true
      },
      location: {
        type: 'boolean',
        value: true,
        editable: true
      }
    },
    'profile-small': {}
  }
} as User

const createUserStore = () => {
  const { subscribe, update, set } = writable<User | null>({...DEFAULT_USER})

  return {
    subscribe,
    update,
    set
  }
}

export const user = createUserStore()
