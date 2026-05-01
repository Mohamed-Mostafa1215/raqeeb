import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';
import { LanguageService } from './core/services/language.service';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    SidebarComponent, 
    NavbarComponent,
    ToastModule,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService);
  loadingService = inject(LoadingService);
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  logout() {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
