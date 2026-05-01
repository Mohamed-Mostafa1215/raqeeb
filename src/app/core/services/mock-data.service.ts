import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // --- 1. Dashboard & Core Stats ---
  getStats() {
    return of([
      { label: 'Total Employees', value: '1,450', subValue: '98% Active', type: 'progress', progress: 98 },
      { label: 'Operational Status', value: 'Optimal', subValue: '89%', type: 'radial', progress: 89 },
      { label: 'Project Completion', value: '65%', subValue: 'Wave Chart', type: 'chart', progress: 65 },
      { label: 'Active Deployments', value: '312', subValue: 'Realtime', type: 'glow', progress: 100 }
    ]).pipe(delay(400));
  }

  getFleetStatus() {
    return of([
      { label: 'Active', value: 340, color: '#3B82F6' },
      { label: 'Idle', value: 210, color: '#94A3B8' },
      { label: 'Maintenance', value: 85, color: '#F43F5E' }
    ]).pipe(delay(500));
  }

  getMilestones() {
    return of([
      { name: 'Project Orion', status: 'Progress', progress: 82 },
      { name: 'Infrastructure Wave', status: 'Active', progress: 45 },
      { name: 'Logistics Zeta', status: 'Progress', progress: 88 }
    ]).pipe(delay(600));
  }

  // --- 2. Tracking & Map ---
  getMapNodes() {
    return of([
      { id: 'NODE-842', top: '30%', left: '40%', type: 'truck', status: 'active' },
      { id: 'NODE-122', top: '60%', left: '25%', type: 'site', status: 'pending' },
      { id: 'NODE-905', top: '45%', left: '70%', type: 'alert', status: 'warning' },
      { id: 'NODE-550', top: '20%', left: '15%', type: 'truck', status: 'active' }
    ]).pipe(delay(600));
  }

  getIntelligenceKey() {
    return of([
      { label: 'Active Sites', value: 48, color: 'bg-emerald-500' },
      { label: 'Vehicles', value: 74, color: 'bg-raqeeb-azure' },
      { label: 'Critical Alerts', value: 3, color: 'bg-rose-500' },
      { label: 'Teams Syncing', value: 23, color: 'bg-slate-400' }
    ]).pipe(delay(700));
  }

  // --- 3. Tasks & Media ---
  getTasks() {
    return of([
      { id: 'TSK-001', title: 'HVAC Maintenance - Sector 7', priority: 'HIGH', status: 'IN_PROGRESS', beforePhoto: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop', afterPhoto: null },
      { id: 'TSK-002', title: 'Solar Array Inspection', priority: 'MEDIUM', status: 'COMPLETED', beforePhoto: 'https://images.unsplash.com/photo-150939136634b-c845f7f163f3?w=200&h=150&fit=crop', afterPhoto: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=200&h=150&fit=crop' },
      { id: 'TSK-003', title: 'Concrete Base Pouring', priority: 'CRITICAL', status: 'PENDING', beforePhoto: null, afterPhoto: null }
    ]).pipe(delay(800));
  }

  // --- 4. Finance & Payroll ---
  getPayrollData() {
    return of({
      currentEarning: 4250.75,
      lastPayout: 3800.00,
      hoursWorked: 168.5,
      overtime: 12.5,
      history: [
        { month: 'February', amount: 3800.00, status: 'PAID' },
        { month: 'January', amount: 3750.50, status: 'PAID' }
      ]
    }).pipe(delay(900));
  }

  // --- 5. Chat & Real-time ---
  getChatThreads() {
    return of([
      { id: 'CH-1', user: 'Eng. Sarah Ahmed', lastMsg: 'Project Orion blueprints updated.', unread: 2, avatar: 'https://ui-avatars.com/api/?name=Sarah+Ahmed' },
      { id: 'CH-2', user: 'Operations Center', lastMsg: 'Sector 4 clearance granted.', unread: 0, avatar: 'https://ui-avatars.com/api/?name=Ops+Center' }
    ]).pipe(delay(500));
  }

  // --- 6. Attendance & FaceID Status ---
  getAttendanceHistory() {
    return of([
      { date: '2026-03-16', clockIn: '08:00 AM', clockOut: '05:00 PM', status: 'VERIFIED', gps: 'MATCH' },
      { date: '2026-03-15', clockIn: '08:15 AM', clockOut: '05:30 PM', status: 'VERIFIED', gps: 'MATCH' }
    ]).pipe(delay(600));
  }

  getFaceIDStatus() {
    return of({
      registered: true,
      lastScan: '2026-03-17 08:01 AM',
      qualityScore: 0.98,
      livenessCertified: true
    }).pipe(delay(300));
  }
}
