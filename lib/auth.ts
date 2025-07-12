// Simple authentication service for admin access
const ADMIN_PASSWORD = "admin123"; // Change this to a secure password

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem("adminAuth", "true");
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem("adminAuth");
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem("adminAuth") === "true";
};