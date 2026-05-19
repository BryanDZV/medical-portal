import "next-auth";
import "next-auth/jwt";
import type { Role } from "./user.types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    role?: Role;
  }
}