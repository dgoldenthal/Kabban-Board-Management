// client/src/utils/auth.ts

import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  exp: number;
}

class AuthService {
  private static TOKEN_KEY = 'jwt_token';

  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_KEY) || '';
  }

  login(idToken: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    window.location.assign('/login');
  }
}

export default new AuthService();