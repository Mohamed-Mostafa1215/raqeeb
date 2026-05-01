import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  languageService = inject(LanguageService);
  toggleMenu = output<void>();

  today = new Date();

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
