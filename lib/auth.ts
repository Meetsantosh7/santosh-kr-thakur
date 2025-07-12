const ADMIN_PASSWORD_HASH = "15e24a16abfc4eef5faeb806e903f78b180b07580f80030d1e4e2205ccb6a7a9"; // SHA-256 for "skt1917"

async function hashPassword(password: string): Promise<string> {
  console.log("Hashing password:", password); // Debug log
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  console.log("Generated hash:", hashHex); // Debug log
  return hashHex;
}

export const login = async (password: string): Promise<boolean> => {
  if (password === "skt1917") {
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