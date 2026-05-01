import { Injectable, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private messageService = inject(MessageService);
  private mockDataService = inject(MockDataService);

  $lastCheckIn = signal<any>(null);
  $isClockedIn = signal<boolean>(false);

  async checkInWithFaceID(imageData: string, location: GeolocationPosition | null) {
    this.messageService.add({ 
      severity: 'info', 
      summary: 'Biometric Verification', 
      detail: 'Scanning facial patterns & checking Secure_GRID...' 
    });

    // Mock verification delay
    let distance = 0;
    let isInsideRange = true;

    if (location) {
      const workSite = { lat: 30.0444, lng: 31.2357 }; // Example: Cairo Office
      distance = this.calculateDistance(location.coords.latitude, location.coords.longitude, workSite.lat, workSite.lng);
      isInsideRange = distance <= 0.5; // 500m margin for GPS drift
    } else {
      // Fallback: Location denied or error
      this.messageService.add({ 
        severity: 'warn', 
        summary: 'GPS Warning', 
        detail: 'Protocol: GPS_NULL. Proceeding with Biometric-only override.' 
      });
    }

    if (location && !isInsideRange) {
      this.messageService.add({ 
        severity: 'error', 
        summary: 'Access Denied', 
        detail: 'Protocol_Error: Coordinates outside of authorized sector.' 
      });
      return false;
    }

    // Record the check-in
    this.$lastCheckIn.set({ 
      time: new Date(), 
      location: location ? { lat: location.coords.latitude, lng: location.coords.longitude } : 'GPS_UNAVAILABLE',
      isInsideRange 
    });
    this.$isClockedIn.set(true);

    this.messageService.add({ 
      severity: 'success', 
      summary: 'Auth_Established', 
      detail: location 
        ? `Shift initiated. Site relative: ${distance.toFixed(3)}km.` 
        : 'Shift initiated via override. Location verification pending.' 
    });

    return true;
  }

  clockOut() {
    this.$isClockedIn.set(false);
    this.messageService.add({ 
      severity: 'warn', 
      summary: 'Clock-out Recorded', 
      detail: 'Shift ended successfully. Have a great day!' 
    });
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
