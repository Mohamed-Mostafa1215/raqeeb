import { Injectable, signal, computed, inject } from '@angular/core';
import { Task, TasksState } from '../models/stores.model';
import { TaskService } from '../services/task.service';

/**
 * Raqeeb Tasks Intelligence Hub:
 * Manages all operational assignments and their real-time lifecycle.
 */
@Injectable({ providedIn: 'root' })
export class TasksStore {
  private taskService = inject(TaskService);

  // ─── Tactical Data Layer (Private State) ───
  private state = signal<TasksState>({
    tasks: [
      // Simulated initial task for tactical demo
      {
        id: 'TKS-042',
        title: 'Security Perimeter Check',
        description: 'Verify all primary access nodes in Sector 7.',
        status: 'pending',
        priority: 'high',
        updatedAt: new Date(),
        deadline: new Date(Date.now() + 14400000) // 4 hours from now
      }
    ],
    filter: 'all',
    isLoading: false,
    error: null
  });

  // ─── Computational Overlay (Selectors) ───
  readonly allTasks = computed(() => this.state().tasks);
  readonly filter = computed(() => this.state().filter);
  readonly isLoading = computed(() => this.state().isLoading);
  readonly error = computed(() => this.state().error);

  readonly filteredTasks = computed(() => {
    const { tasks, filter } = this.state();
    if (filter === 'all') return tasks;
    if (filter === 'pending') return tasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
    if (filter === 'completed') return tasks.filter(t => t.status === 'completed' || t.status === 'verified');
    return tasks;
  });

  readonly pendingCount = computed(() => 
    this.state().tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length
  );

  // ─── Command Actions (Mutations) ───
  async fetchTasks() {
    this.setState({ isLoading: true, error: null });
    try {
      // Mock delay to simulate network sync
      await new Promise(r => setTimeout(r, 800));
      // In a real scenario: const tasks = await this.taskService.getTasks();
      // For now we keep our mock initial state or assume it's updated.
      this.setState({ isLoading: false });
    } catch (err: any) {
      this.setState({ error: 'SYSTEM_ERROR: FAIL_LOAD_TASKS', isLoading: false });
    }
  }

  async updateTaskStatus(taskId: string, status: Task['status'], photo?: string) {
    this.setState({ isLoading: true, error: null });
    try {
      // Logic would typically involve calling TaskService.updateTaskStatus()
      this.state.update(current => ({
        ...current,
        tasks: current.tasks.map(t => 
          t.id === taskId 
          ? { ...t, status, updatedAt: new Date(), afterPhoto: photo || t.afterPhoto } 
          : t
        ),
        isLoading: false
      }));
    } catch (err: any) {
      this.setState({ error: 'TRANSITION_FAILURE: STATUS_NOT_SYNCED', isLoading: false });
    }
  }

  async uploadMedia(taskId: string, type: 'before' | 'after', photoUrl: string) {
    this.setState({ isLoading: true, error: null });
    try {
      // Mock network latency for media analysis
      await new Promise(r => setTimeout(r, 1200));
      this.state.update(current => ({
        ...current,
        tasks: current.tasks.map(t => 
          t.id === taskId 
          ? { ...t, [type === 'before' ? 'beforePhoto' : 'afterPhoto']: photoUrl, updatedAt: new Date() } 
          : t
        ),
        isLoading: false
      }));
    } catch (err) {
      this.setState({ error: 'MEDIA_FAILURE: UPLOAD_ABORTED', isLoading: false });
    }
  }

  setFilter(filter: TasksState['filter']) {
    this.setState({ filter });
  }

  // Tactical State Reducer
  private setState(partial: Partial<TasksState>) {
    this.state.update(current => ({ ...current, ...partial }));
  }
}
