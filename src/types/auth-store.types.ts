import type { User } from "./user.types";

export interface AuthState {
  user: User | null;
  users: User[];
  failedAttempts: number;
  isBlocked: boolean;
  hasHydrated: boolean;

  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
  setHasHydrated: (state: boolean) => void;
  resetBlock: () => void;
}
