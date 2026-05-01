import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  $tasks = signal<any[]>([]);

  updateTaskStatus(taskId: string, status: string, photo?: File) {
    console.log(`Updating task ${taskId} to ${status}`, photo ? 'with photo' : '');
  }
}
