import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setFilter } from '../store/taskSlice';
import { FilterType } from '../types';
import { useTheme } from '../hooks/useTheme';

const TaskFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(state => state.tasks.filter);
  const tasks = useAppSelector(state => state.tasks.tasks);
  const { isDarkMode } = useTheme();
  
  const activeCount = tasks.filter(task => !task.isDone).length;
  const completedCount = tasks.filter(task => task.isDone).length;
  
  const handleFilterChange = (newFilter: FilterType) => {
    dispatch(setFilter(newFilter));
  };
  
  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 p-4 rounded-lg shadow-sm ${
      isDarkMode ? 'bg-gray-800/50' : 'bg-white'
    }`}>
      <div className={isDarkMode ? 'text-sm text-gray-300' : 'text-sm text-gray-500'}>
        <span className={isDarkMode ? 'text-blue-400 font-medium' : 'text-blue-600 font-medium'}>
          {activeCount}
        </span> active, 
        <span className={`font-medium ml-1 ${
          isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
        }`}>
          {completedCount}
        </span> completed
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
            filter === 'all'
              ? isDarkMode
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('active')}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
            filter === 'active'
              ? isDarkMode
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilterChange('completed')}
          className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
            filter === 'completed'
              ? isDarkMode
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-blue-600 text-white shadow-md'
              : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;