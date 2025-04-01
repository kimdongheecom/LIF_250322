'use client';

import { create } from 'zustand';
import { devtools, persist, createJSONStorage, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type UserState = {
  user_id: string;
  email: string;
  name: string;
};

export type UserActions = {
  setUser: (user: Partial<UserState>) => void;
  updateEmail: (email: string) => void;
  updateName: (name: string) => void;
  reset: () => void;
  fetchUserFromAPI: (userId: string) => Promise<void>;
};

type AuthStore = UserState & UserActions;

export const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    devtools(
      persist(
        immer((set) => ({
          user_id: '',
          email: '',
          name: '',

          // ✅ 전체 유저 상태 설정
          setUser: (user) =>
            set((state) => {
              Object.assign(state, user);
            }),

          // ✅ 이메일만 업데이트
          updateEmail: (email) =>
            set((state) => {
              state.email = email;
            }),

          // ✅ 이름만 업데이트
          updateName: (name) =>
            set((state) => {
              state.name = name;
            }),

          // ✅ 상태 초기화
          reset: () =>
            set((state) => {
              state.user_id = '';
              state.email = '';
              state.name = '';
            }),

          // ✅ 비동기 fetch 예시
          fetchUserFromAPI: async (userId: string) => {
            const response = await fetch(`/api/user/${userId}`);
            if (!response.ok) {
              console.error('Failed to fetch user');
              return;
            }
            const data = await response.json();
            set((state) => {
              state.user_id = data.user_id;
              state.email = data.email;
              state.name = data.name;
            });
          },
        })),
        {
          name: 'auth-storage',
          storage: createJSONStorage(() => localStorage),
          partialize: (state) => ({
            user_id: state.user_id,
            email: state.email,
            name: state.name,
          }),
        }
      ),
      {
        name: 'AuthStore',
      }
    )
  )
);
