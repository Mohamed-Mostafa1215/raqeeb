export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'verified';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  beforePhoto?: string;
  afterPhoto?: string;
  location?: { lat: number; lng: number };
  deadline: Date;
  updatedAt: Date;
}

export interface TasksState {
  tasks: Task[];
  filter: 'all' | 'pending' | 'completed';
  isLoading: boolean;
  error: string | null;
}

export interface WalletTransaction {
  id: string;
  type: 'incoming' | 'outgoing' | 'service_fee';
  amount: number;
  date: Date;
  description: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  isLoading: boolean;
  error: string | null;
}
