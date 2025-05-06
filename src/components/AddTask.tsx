import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { addTask } from '../store/taskSlice';
import { PlusCircle } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const AddTask: React.FC = () => {
  const [description, setDescription] = useState('');
  const dispatch = useAppDispatch();
  const { isDarkMode } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (description.trim()) {
      const newTask = {
        id: crypto.randomUUID(),
        description: description.trim(),
        isDone: false,
        createdAt: Date.now(),
      };
      
      dispatch(addTask(newTask));
      setDescription('');
      
      const input = document.getElementById('task-input');
      if (input) {
        input.classList.add('scale-102');
        setTimeout(() => input.classList.remove('scale-102'), 150);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          id="task-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a new task..."
          className={`w-full py-3 pl-4 pr-12 rounded-lg shadow-sm focus:outline-none transition-all duration-200 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
              : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
          } border`}
          maxLength={100}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          } transition-colors duration-200`}
          disabled={!description.trim()}
          aria-label="Add task"
        >
          <PlusCircle 
            size={24} 
            className={`${description.trim() ? 'opacity-100' : 'opacity-50'} transition-opacity duration-200`} 
          />
        </button>
      </div>
      <div className={`mt-2 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} pl-2`}>
        Press Enter to add
      </div>
    </form>
  );
};

export default AddTask;