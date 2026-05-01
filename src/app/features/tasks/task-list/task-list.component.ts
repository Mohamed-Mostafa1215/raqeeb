import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageService } from 'primeng/api';
import { TasksStore } from '../../../core/stores/tasks.store';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, CardComponent, TranslateModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  public store = inject(TasksStore);
  private messageService = inject(MessageService);

  constructor() {
    // Audit log for critical state changes
    effect(() => {
      const error = this.store.error();
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'SYSTEM_ALERT', detail: error });
      }
    });
  }

  ngOnInit() {
    this.store.fetchTasks();
  }

  async updateStatus(taskId: string, newStatus: any) {
    await this.store.updateTaskStatus(taskId, newStatus);
    if (!this.store.error()) {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'PROTOCOL_SYNC', 
        detail: `Status updated to ${newStatus}` 
      });
    }
  }

  async uploadMedia(taskId: string, type: 'before' | 'after') {
    const mockPhoto = 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=200';
    
    await this.store.uploadMedia(taskId, type, mockPhoto);
    
    if (!this.store.error()) {
      this.messageService.add({ 
        severity: 'success', 
        summary: 'EVIDENCE_RECORDED', 
        detail: `Tactical asset ${type} logged.` 
      });
    }
  }
}
