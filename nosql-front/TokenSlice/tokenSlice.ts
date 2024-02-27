import { create } from 'zustand'

export interface Token {
  token: string | null
  setToken: (token: string) => void
}

export const useTokenStore = create<Token>()((set) => ({
  token: null,
  setToken: (token: string) => set((state) => ({ token: token })),
}))