import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletStore } from '../../../core/stores/wallet.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslateModule, FormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  public store = inject(WalletStore);
  private messageService = inject(MessageService);
  
  withdrawAmount: number = 0;

  constructor() {
    // Monitor for tactical system errors
    effect(() => {
      const error = this.store.error();
      if (error) {
        this.messageService.add({ 
          severity: 'error', 
          summary: 'FINANCIAL_ABORT', 
          detail: error 
        });
        this.store.resetError();
      }
    });
  }

  ngOnInit() {
    this.store.fetchFinancialData();
  }

  async processWithdrawal() {
    if (this.withdrawAmount <= 0) return;

    await this.store.withdrawFunds(this.withdrawAmount);
    
    if (!this.store.error()) {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'TRANSACTION_LOGGED', 
        detail: `Transfer of ${this.withdrawAmount} SAR initialized.` 
      });
      this.withdrawAmount = 0;
    }
  }
}
