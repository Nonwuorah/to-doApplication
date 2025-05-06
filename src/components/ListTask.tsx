import React from 'react';
import { useAppSelector } from '../hooks/useRedux';
import Task from './Task';
import { ClipboardList } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ListTask: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const filter = useAppSelector(state => state.tasks.filter);
  const { isDarkMode } = useTheme();
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isDone;
    if (filter === 'completed') return task.isDone;
    return true; // 'all' filter
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.isDone !== b.isDone) {
      return a.isDone ? 1 : -1;
    }
    return b.createdAt - a.createdAt;
  });

  if (sortedTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <ClipboardList size={48} className={isDarkMode ? 'text-gray-600' : 'text-gray-300'} />
        <p className={`font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          No tasks found
        </p>
        <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-400 text-sm'}>
          {filter === 'all' 
            ? "Add your first task to get started!" 
            : filter === 'active' 
              ? "No active tasks - time to relax!" 
              : "No completed tasks yet"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 animate-fadeIn">
      {sortedTasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default ListTask;