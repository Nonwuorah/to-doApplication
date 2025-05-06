import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

// Load tasks from localStorage if available
const loadTasks = (): Task[] => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
  }
  return [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  try {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

interface TaskState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
}

const initialState: TaskState = {
  tasks: loadTasks(),
  filter: 'all',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      saveTasks(state.tasks);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.isDone = !task.isDone;
        saveTasks(state.tasks);
      }
    },
    editTask: (state, action: PayloadAction<{ id: string; description: string }>) => {
      const { id, description } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.description = description;
        saveTasks(state.tasks);
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasks(state.tasks);
    },
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, editTask, deleteTask, setFilter } = taskSlice.actions;
export default taskSlice.reducer;