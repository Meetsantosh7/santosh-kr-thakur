
const ADMIN_PASSWORD_HASH = "e2e6e2b1e3e3e6e8e6e2e2e6e2e6e2e6e2e6e2e6e2e6e2e6e2e6e2e6e2e6e2e6e2e6"; // Replace with actual hash

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const login = (password: string): boolean | Promise<boolean> => {
  // Because hashing is async, return a Promise
  return hashPassword(password).then(hash => {
    if (hash === ADMIN_PASSWORD_HASH) {
      localStorage.setItem("adminAuth", "true");
      return true;
    }
    return false;
  });
};

export const logout = (): void => {
  localStorage.removeItem("adminAuth");
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem("adminAuth") === "true";
};