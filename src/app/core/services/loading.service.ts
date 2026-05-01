import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingCount = signal(0);
  
  // Computed signal to track if any request is in progress
  isLoading = signal(false);

  show() {
    // Wrapped in microtask/timeout to prevent NG0600 error if called during rendering
    setTimeout(() => {
      this.loadingCount.update(count => count + 1);
      this.isLoading.set(true);
    });
  }

  hide() {
    setTimeout(() => {
      this.loadingCount.update(count => Math.max(0, count - 1));
      if (this.loadingCount() === 0) {
        this.isLoading.set(false);
      }
    });
  }
}
