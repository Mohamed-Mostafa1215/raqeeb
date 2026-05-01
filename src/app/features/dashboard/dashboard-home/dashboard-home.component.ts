import { Component, inject, signal, viewChild, ElementRef, effect, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { MockDataService } from '../../../core/services/mock-data.service';
import { Chart } from 'chart.js/auto';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslateModule, SkeletonComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  authService  = inject(AuthService);
  themeService = inject(ThemeService);
  mockService  = inject(MockDataService);

  fleetCanvas      = viewChild<ElementRef<HTMLCanvasElement>>('fleetChart');
  attendanceCanvas = viewChild<ElementRef<HTMLCanvasElement>>('attendanceChart');

  stats          = signal<any[]>([]);
  fleetStatus    = signal<any[]>([]);
  milestones     = signal<any[]>([]);
  logisticsNodes = signal<any[]>([]);
  mapNodes       = signal<any[]>([]);
  intelKey       = signal<any[]>([]);

  /** Loading state drives skeleton display */
  loading = signal(true);

  private fleetChartInstance:      Chart | null = null;
  private attendanceChartInstance: Chart | null = null;

  constructor() {
    // Re-build charts reactively when theme or data changes
    effect(() => {
      const fleetEl  = this.fleetCanvas()?.nativeElement;
      const attEl    = this.attendanceCanvas()?.nativeElement;
      const theme    = this.themeService.theme();
      const fleetData = this.fleetStatus();

      // Resolve colors from CSS variables at runtime
      const tickColor    = theme === 'dark' ? 'rgba(240,244,255,0.4)' : 'rgba(10,14,35,0.5)';
      const gridColor    = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(10,14,35,0.04)';
      const azureColor   = '#00F2FF';
      const azureFill    = theme === 'dark' ? 'rgba(0,242,255,0.08)' : 'rgba(0,242,255,0.06)';

      // Destroy existing charts before re-creating
      if (this.fleetChartInstance) { this.fleetChartInstance.destroy(); this.fleetChartInstance = null; }
      if (this.attendanceChartInstance) { this.attendanceChartInstance.destroy(); this.attendanceChartInstance = null; }

      if (fleetEl && fleetData.length > 0) {
        this.fleetChartInstance = new Chart(fleetEl, {
          type: 'bar',
          data: {
            labels: fleetData.map((s: any) => s.label),
            datasets: [{
              data:            fleetData.map((s: any) => s.value),
              backgroundColor: fleetData.map((s: any) => s.color || azureColor),
              borderRadius:    10,
              barThickness:    36
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { display: false, grid: { color: gridColor } },
              x: {
                grid: { display: false },
                ticks: { color: tickColor, font: { weight: 'bold', size: 10, family: 'JetBrains Mono' } }
              }
            }
          }
        });
      }

      if (attEl) {
        this.attendanceChartInstance = new Chart(attEl, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              data: [65, 78, 62, 85, 72, 90, 82],
              borderColor:         azureColor,
              borderWidth:         2.5,
              pointBackgroundColor: azureColor,
              pointBorderColor:    azureColor,
              pointBorderWidth:    2,
              pointRadius:         3,
              tension:             0.4,
              fill:                true,
              backgroundColor:     azureFill
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { display: false, grid: { color: gridColor } },
              x: {
                grid: { display: false },
                ticks: { color: tickColor, font: { weight: 'bold', size: 10, family: 'JetBrains Mono' } }
              }
            }
          }
        });
      }
    });
  }

  ngOnInit() {
    this.loadMockData();
  }

  ngOnDestroy() {
    if (this.fleetChartInstance)      this.fleetChartInstance.destroy();
    if (this.attendanceChartInstance) this.attendanceChartInstance.destroy();
  }

  loadMockData() {
    this.loading.set(true);

    this.mockService.getStats().subscribe((data: any) => {
      this.stats.set(data);
      this.loading.set(false);
    });

    this.mockService.getFleetStatus().subscribe((data: any) => this.fleetStatus.set(data));
    this.mockService.getMilestones().subscribe((data:  any) => this.milestones.set(data));
    this.mockService.getMapNodes().subscribe((data:    any) => this.mapNodes.set(data));
    this.mockService.getIntelligenceKey().subscribe((data: any) => this.intelKey.set(data));

    this.logisticsNodes.set([
      { name: 'Riyadh Control', status: 'active'  },
      { name: 'Jeddah Hub',     status: 'pending' },
      { name: 'Dammam Site',    status: 'pending' },
      { name: 'Medina Ops',     status: 'pending' },
      { name: 'Tabuk Node',     status: 'pending' },
    ]);
  }
}
