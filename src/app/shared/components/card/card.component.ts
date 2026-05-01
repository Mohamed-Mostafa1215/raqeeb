import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'overflow-hidden transition-all duration-300 ' + customClass()"
         [style]="'background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--card-radius); box-shadow: var(--card-shadow);'">
      @if (title()) {
        <div class="flex items-center justify-between"
             style="padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); background: rgba(var(--bg-tertiary), 0.5);">
          <div>
            <h3 class="font-black tracking-tight"
                style="font-size: 1rem; font-family: var(--font-display); color: var(--text-primary);">
              {{ title() }}
            </h3>
            @if (subtitle()) {
              <p class="font-bold uppercase tracking-widest mt-1"
                 style="font-size: 0.625rem; color: var(--text-secondary); font-family: var(--font-mono);">
                {{ subtitle() }}
              </p>
            }
          </div>
          <ng-content select="[header-actions]"></ng-content>
        </div>
      }
      <div [class]="'p-8 ' + contentClass()">
        <ng-content></ng-content>
      </div>
      @if (hasFooter()) {
        <div style="padding: 1rem 2rem; border-top: 1px solid var(--border-color); background: var(--bg-tertiary);">
          <ng-content select="[footer]"></ng-content>
        </div>
      }
    </div>
  `
})
export class CardComponent {
  title       = input<string>('');
  subtitle    = input<string>('');
  customClass = input<string>('');
  contentClass = input<string>('');
  hasFooter   = input<boolean>(false);
}

