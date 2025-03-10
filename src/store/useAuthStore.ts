import { create } from "zustand";

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthStore {
  users: User[];
  loggedUser: User | null;
  alert: { message: string; type: "success" | "error" } | null;
  registerUser: (user: User) => boolean;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
  setAlert: (message: string, type: "success" | "error") => void;
}

export const useAuthStore = create<AuthStore>((set, get) => {
  const savedUsers = sessionStorage.getItem("users");
  const savedLoggedUser = sessionStorage.getItem("loggedUser");

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
        sessionStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
      return true;
    },

    loginUser: (email, password) => {
      const { users } = get();
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        sessionStorage.setItem("loggedUser", JSON.stringify(user));
        set({ loggedUser: user });
        return true;
      } else {
        return false;
      }
    },

    logoutUser: () => {
      sessionStorage.removeItem("loggedUser");
      set({ loggedUser: null });
    },

    setAlert: (message: string, type: "success" | "error") => {
      set({ alert: { message, type } });

      setTimeout(() => {
        set({ alert: null });
      }, 3500);
    },
  };
});