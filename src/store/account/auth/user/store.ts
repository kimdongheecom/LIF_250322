// src/store/authStore.ts
'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type UserType = {
  user_id: string;
  email: string;
  password: string;
  name: string;
  reset: () => void;
}

export const useAuthStore = create<UserType>()(
  persist((set) => ({
    user_id: "",
    email: "",
    password: "",
    name: "",
    reset: () => set({
      user_id: "",
      email: "",
      password: "",
      name: "",
    }),
  }), {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  })
)