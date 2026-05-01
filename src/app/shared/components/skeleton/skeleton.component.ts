import { Component, input } from '@angular/core';

/**
 * SkeletonComponent — Shimmer placeholder for loading states
 *
 * Usage:
 *   <app-skeleton height="20px" width="60%" />
 *   <app-skeleton height="16px" width="90%" />
 *   <app-skeleton variant="circle" width="48px" height="48px" />
 *
 * Replaces any spinner during data-loading states.
 */
@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton-wrap"
      [style.width]="width()"
      [style.height]="height()"
      [style.border-radius]="variant() === 'circle' ? '50%' : radius()"
      [style.margin-bottom]="gap()"
    ></div>
  `,
  styles: [`
    :host { display: block; }

    .skeleton-wrap {
      background: linear-gradient(
        90deg,
        var(--bg-tertiary, #EEF2FF) 25%,
        var(--border-color, rgba(10,14,35,0.06)) 50%,
        var(--bg-tertiary, #EEF2FF) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.6s ease-in-out infinite;
    }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `]
})
export class SkeletonComponent {
  width   = input<string>('100%');
  height  = input<string>('16px');
  radius  = input<string>('var(--radius-md, 8px)');
  gap     = input<string>('0px');
  variant = input<'rect' | 'circle'>('rect');
}
