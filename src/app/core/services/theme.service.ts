import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  theme = signal<'dark' | 'light'>('dark');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('raqeeb-theme') as 'dark' | 'light';
      if (savedTheme) {
        this.theme.set(savedTheme);
      }
    }
    
    // Sync with DOM
    effect(() => {
      const currentTheme = this.theme();
      if (isPlatformBrowser(this.platformId)) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('raqeeb-theme', currentTheme);
      }
    });
  }

  toggleTheme() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
