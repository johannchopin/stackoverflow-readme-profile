import { writable } from 'svelte/store'

interface User {
  id: number
  theme: string
}

const createUserStore = () => {
  const { subscribe, update, set } = writable<User | null>({ theme: 'default' } as User)

  return {
    subscribe,
    update,
    set
  }
}

export const user = createUserStore()
