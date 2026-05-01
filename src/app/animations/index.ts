import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

/**
 * fadeUp: element enters from below with opacity fade
 * Used on: page-level containers, stat cards, form fields
 */
export const fadeUpAnimation = trigger('fadeUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(16px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))
  ])
]);

/**
 * fadeIn: simple opacity fade
 * Used on: overlays, tooltips
 */
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0 }))
  ])
]);

/**
 * scaleIn: subtle scale + fade
 * Used on: modal dialogs, dropdowns
 */
export const scaleInAnimation = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('250ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
]);

/**
 * listAnimation: staggered enter for list items
 * Used on: *ngFor wrappers, stat card grids
 */
export const listAnimation = trigger('listAnim', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      stagger(70, [
        animate('280ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

/**
 * routeAnimation: smooth page transitions on route change
 * Apply [@routeAnim] to the <router-outlet> wrapper div
 */
export const routeAnimation = trigger('routeAnim', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

/**
 * slideInFromSide: sidebar and panel slide-in
 */
export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-16px)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-16px)' }))
  ])
]);
