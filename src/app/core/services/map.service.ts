import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  $pins = signal<any[]>([]);

  updateWorkerLocations(locations: any[]) {
    this.$pins.set(locations);
  }
}
