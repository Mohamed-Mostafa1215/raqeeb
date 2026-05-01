import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-live-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-map.component.html',
  styleUrl: './live-map.component.css'
})
export class LiveMapComponent {
  zones = signal([
    { id: 'Z1', name: 'Sector 7 (HVAC)', workers: 12, color: 'bg-raqeeb-azure' },
    { id: 'Z2', name: 'Array B (Solar)', workers: 8, color: 'bg-emerald-500' },
    { id: 'Z3', name: 'North District', workers: 5, color: 'bg-amber-500' }
  ]);
}
