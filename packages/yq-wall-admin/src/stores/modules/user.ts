
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  token: string,
  setToken: (data: string) => void,
  user: any,
  setUser: (data: any) => void,
  role: any,
  setRole: (data: any) => void,
  quitLogin: () => void
}

export default create(
  persist<UserStore>(
    (set) => ({
      token: "",
      setToken: (token: string) => set(() => ({ token })),
      user: {} as any,
      setUser: (data: any) => set(() => ({ user: data })),
      role: {} as any,
      setRole: (data: any) => set(() => ({ role: data })),
      // 退出登录
      quitLogin: () => set(() => {
        localStorage.clear();
        sessionStorage.clear();
        location.href = "/login";
        return { token: "", user: {} as any, role: {} as any }
      })
    }),
    {
      name: 'user_storage',
      getStorage: () => localStorage,
      // 定义需要持久化存储的数据，默认表示全部持久化
      // partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
