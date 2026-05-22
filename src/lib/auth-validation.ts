export type LoginErrors = {
  general?: string;
};

const INVALID_CREDENTIALS_MESSAGE =
  "Usuario y/o contraseña incorrectos.";

export function validateLoginForm(email: string, password: string): LoginErrors {
  if (!email.trim() || !password.trim()) {
    return { general: INVALID_CREDENTIALS_MESSAGE };
  }

  return {};
}
