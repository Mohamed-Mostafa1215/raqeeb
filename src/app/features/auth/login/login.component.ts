import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';

import { TranslateModule } from '@ngx-translate/core';
import { LogoComponent } from '../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  router = inject(Router);

  credentials = { username: '', password: '' };

  login() {
    this.authService.login(this.credentials);
    this.router.navigate(['/dashboard']);
  }
}
