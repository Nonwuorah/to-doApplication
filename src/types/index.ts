export interface Task {
  id: string;
  description: string;
  isDone: boolean;
  createdAt: number;
}

export type FilterType = 'all' | 'active' | 'completed';