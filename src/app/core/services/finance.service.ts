import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  $payrollData = signal<any[]>([]);
  $debts = signal<any[]>([]);

  loadFinanceReport() {
    this.$payrollData.set([{ id: 1, amount: 5000, status: 'PAID' }]);
  }
}
