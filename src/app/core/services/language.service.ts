import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translateService = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  
  // Defaulting to Arabic (ar) as per user requirements
  currentLang = signal('ar');

  constructor() {
    this.initLanguage();
  }

  private initLanguage() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('raqeeb_lang') || 'ar';
      this.translateService.setDefaultLang('ar');
      this.setLanguage(savedLang);
    } else {
      // In SSR we only set default
      this.translateService.setDefaultLang('ar');
    }
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
    this.currentLang.set(lang);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('raqeeb_lang', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      
      // Update body class for font switching if needed
      if (lang === 'ar') {
        document.body.classList.add('rtl');
        document.body.classList.remove('ltr');
      } else {
        document.body.classList.add('ltr');
        document.body.classList.remove('rtl');
      }
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang() === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }
}
