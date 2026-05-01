import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../core/services/mock-data.service';
import { CardComponent } from '../../../shared/components/card/card.component';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslateModule],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.css'
})
export class PayrollComponent implements OnInit {
  private mockService = inject(MockDataService);
  
  payroll = signal<any>(null);

  ngOnInit() {
    this.mockService.getPayrollData().subscribe(data => this.payroll.set(data));
  }

  downloadSlip(month: string) {
    console.log(`Downloading payslip for ${month}...`);
    // Mock download behavior
  }
}
