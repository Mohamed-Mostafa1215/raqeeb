import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-6 group cursor-pointer" [class.flex-col]="isVertical()">
      <div class="relative w-14 h-14 flex items-center justify-center">
         <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Tactical Shield Base -->
            <path d="M30 4L52 14V30C52 44.5 42.5 54 30 56C17.5 54 8 44.5 8 30V14L30 4Z" stroke="url(#logo_grad)" stroke-width="3" />
            
            <!-- Cyber Core -->
            <rect x="26" y="20" width="8" height="20" fill="url(#logo_grad)" />
            <path d="M22 28H38M22 32H38" stroke="white" stroke-width="1.5" opacity="0.6" />
            
            <!-- Corner Accents -->
            <path d="M12 18V12H18" stroke="var(--color-raqeeb-azure)" stroke-width="2" />
            <path d="M42 12H48V18" stroke="var(--color-raqeeb-azure)" stroke-width="2" />

            <defs>
               <linearGradient id="logo_grad" x1="8" y1="4" x2="52" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#00F2FF" />
                  <stop offset="1" stop-color="#0A0E23" />
               </linearGradient>
            </defs>
         </svg>
      </div>
      <div class="flex flex-col text-start" [class.items-center]="isVertical()" [class.text-center]="isVertical()">
        <h2 class="text-3xl font-black tracking-tighter uppercase italic leading-none font-display" [class.text-white]="isInverse()" [class.text-raqeeb-navy]="!isInverse()">
          {{ text() }}
        </h2>
        <span class="text-[8px] font-mono text-raqeeb-azure uppercase tracking-[0.5em] mt-3 opacity-60">
          PRO_SEC_PLATFORM_V4
        </span>
      </div>
    </div>
  `
})
export class LogoComponent {
  text = input<string>('RAQEEB');
  isVertical = input<boolean>(false);
  isInverse = input<boolean>(true);
}
