import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceService } from '../../../core/services/attendance.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent {
  attendanceService = inject(AttendanceService);
  isVerifying = signal(false);
  
  // Computed-like state for UI
  isClockedIn = this.attendanceService.$isClockedIn;

  verify() {
    if (this.isVerifying()) return;
    this.isVerifying.set(true);
    
    // Attempt Geolocation
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Mock delay for FaceID scan animation
        setTimeout(async () => {
          const success = await this.attendanceService.checkInWithFaceID('face_hash_mock', pos);
          this.isVerifying.set(false);
        }, 2500);
      }, 
      (err) => {
        console.warn('Geolocation disabled, proceeding with biometric override:', err);
        // Fallback: Proceed without GPS
        setTimeout(async () => {
          await this.attendanceService.checkInWithFaceID('face_hash_mock', null);
          this.isVerifying.set(false);
        }, 2000);
      },
      { enableHighAccuracy: true }
    );
  }

  clockOut() {
    this.attendanceService.clockOut();
  }
}
