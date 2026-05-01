import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) 
  },
  { 
    path: 'dashboard', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard-home/dashboard-home.component').then(c => c.DashboardHomeComponent) 
  },
  { 
    path: 'attendance', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/attendance/check-in/check-in.component').then(c => c.CheckInComponent) 
  },
  { 
    path: 'tasks', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-list/task-list.component').then(c => c.TaskListComponent) 
  },
  { 
    path: 'map', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/tracking/live-map/live-map.component').then(c => c.LiveMapComponent) 
  },
  { 
    path: 'wallet', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/finance/wallet/wallet.component').then(c => c.WalletComponent) 
  },
  { 
    path: 'finance', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/finance/payroll/payroll.component').then(c => c.PayrollComponent) 
  },
  { 
    path: 'chat', 
    canActivate: [authGuard],
    loadComponent: () => import('./features/chat/chat-main/chat.component').then(c => c.ChatComponent) 
  }
];
