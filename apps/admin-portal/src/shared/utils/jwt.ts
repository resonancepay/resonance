export const getTokenExpiryMs = (token: string): number | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const decoded = JSON.parse(atob(padded));

    return typeof decoded.exp === "number" ? decoded.exp * 1000 : null;
  } catch {
    return null;
  }
};
