export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(payload) {
  return payload?.exp * 1000 < Date.now();
}

export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

export function getRemainingTime(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return null;
  
  const expTime = payload.exp * 1000;
  const now = Date.now();
  return Math.max(0, expTime - now);
}