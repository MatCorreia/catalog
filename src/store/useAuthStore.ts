import { create } from "zustand";
import { AlertEnum, AuthEnum } from "../enum/enum";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthStore {
  users: User[];
  loggedUser: User | null;
  alert: { message: string; type: AlertEnum.SUCCESS | AlertEnum.ERROR } | null;
  registerUser: (user: User) => boolean;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  setAlert: (message: string, type: AlertEnum.SUCCESS | AlertEnum.ERROR) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => {
  const savedUsers = sessionStorage.getItem(AuthEnum.USERS);
  const savedLoggedUser = sessionStorage.getItem(AuthEnum.LOGGEDUSER);

  const initialUsers: User[] = savedUsers ? JSON.parse(savedUsers) : [];
  const initialLoggedUser = savedLoggedUser ? JSON.parse(savedLoggedUser) : null;

  return {
    users: initialUsers,
    loggedUser: initialLoggedUser,
    alert: null,

    registerUser: (user) => {
      const { users } = get();
      const userExists = users.some((u) => u.email === user.email);

      if (userExists) {
        return false;
      }

      set((state) => {
        const updatedUsers = [...state.users, user];
        sessionStorage.setItem(AuthEnum.USERS, JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
      return true;
    },

    loginUser: (email, password) => {
      const { users } = get();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        sessionStorage.setItem(AuthEnum.LOGGEDUSER, JSON.stringify(user));
        set({ loggedUser: user });
        return true;
      } else {
        return false;
      }
    },

    logoutUser: () => {
      sessionStorage.removeItem(AuthEnum.LOGGEDUSER);
      set({ loggedUser: null });
    },

    setAlert: (message: string, type: AlertEnum.SUCCESS | AlertEnum.ERROR) => {
      set({ alert: { message, type } });

      setTimeout(() => {
        set({ alert: null });
      }, 3500);
    },
  };
});