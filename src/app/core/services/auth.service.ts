import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $isLoggedIn = signal(false);
  $user = signal<{name: string, role: 'MANAGER' | 'WORKER'} | null>(null);

  login(credentials: any) {
    this.$isLoggedIn.set(true);
    // Simulate role logic: Managers have 'admin' in username for demo
    const role = credentials.username?.toLowerCase().includes('admin') ? 'MANAGER' : 'WORKER';
    this.$user.set({ name: credentials.username || 'Raqeeb User', role });
  }

  logout() {
    this.$isLoggedIn.set(false);
    this.$user.set(null);
  }
}
