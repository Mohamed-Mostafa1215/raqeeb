import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { LogoComponent } from '../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LogoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  authService = inject(AuthService);
  languageService = inject(LanguageService);
  closeSidebar = output<void>();

  logout() {
    this.authService.logout();
    this.closeSidebar.emit();
  }
}
