import { Injectable, signal, computed, inject } from '@angular/core';
import { WalletState, WalletTransaction } from '../models/stores.model';

/**
 * Raqeeb Financial Ledger:
 * Real-time monitoring of all incoming and outgoing capital.
 */
@Injectable({ providedIn: 'root' })
export class WalletStore {
  // ─── Financial Data Layer (Private State) ───
  private state = signal<WalletState>({
    balance: 2450.50,
    transactions: [
      {
        id: 'TXN-901',
        type: 'incoming',
        amount: 50.00,
        date: new Date(Date.now() - 3600000),
        description: 'Completed Task: TKS-041 (Security Perimeter)',
        status: 'completed'
      },
      {
        id: 'TXN-902',
        type: 'incoming',
        amount: 75.00,
        date: new Date(Date.now() - 86400000),
        description: 'Completed Task: TKS-039 (Network Maintenance)',
        status: 'completed'
      }
    ],
    isLoading: false,
    error: null
  });

  // ─── Computational Overlay (Selectors) ───
  readonly balance = computed(() => this.state().balance);
  readonly allTransactions = computed(() => this.state().transactions);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);

  readonly recentTransactions = computed(() => 
    this.state().transactions.slice(0, 10).sort((a,b) => b.date.getTime() - a.date.getTime())
  );

  // ─── Financial Protocol Actions (Mutations) ───
  async fetchFinancialData() {
    this.setState({ isLoading: true, error: null });
    try {
      // Mock network latency for financial data
      await new Promise(r => setTimeout(r, 1200));
      // In real scenario: const balance = await this.financeService.getBalance();
      this.setState({ isLoading: false });
    } catch (err) {
      this.setState({ error: 'SYSTEM_ERROR: FAIL_LOAD_LEDGER', isLoading: false });
    }
  }

  async withdrawFunds(amount: number) {
    if (amount > this.state().balance) {
      this.setState({ error: 'INSUFFICIENT_FUNDS: PROTOCOL_ABORTED' });
      return;
    }

    this.setState({ isLoading: true, error: null });
    try {
      await new Promise(r => setTimeout(r, 1500));
      this.state.update(current => ({
        ...current,
        balance: current.balance - amount,
        transactions: [
          {
            id: `TXN-${Math.floor(Math.random() * 1000 + 100).toString()}`,
            type: 'outgoing',
            amount: amount,
            date: new Date(),
            description: 'Manual Withdrawal Request',
            status: 'completed'
          },
          ...current.transactions
        ],
        isLoading: false
      }));
    } catch (err) {
      this.setState({ error: 'TRANSITION_FAILURE: WITHDRAWAL_FAILED', isLoading: false });
    }
  }

  resetError() {
    this.setState({ error: null });
  }

  // Tactical State Reducer
  private setState(partial: Partial<WalletState>) {
    this.state.update(current => ({ ...current, ...partial }));
  }
}
