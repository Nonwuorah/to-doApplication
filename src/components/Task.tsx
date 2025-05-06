import React, { useState, useRef, useEffect } from 'react';
import { Task as TaskType } from '../types';
import { useAppDispatch } from '../hooks/useRedux';
import { toggleTask, editTask, deleteTask } from '../store/taskSlice';
import { Check, X, Edit2, Trash2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface TaskProps {
  task: TaskType;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedDescription(task.description);
  };
  
  const handleSaveEdit = () => {
    if (editedDescription.trim()) {
      dispatch(editTask({ id: task.id, description: editedDescription.trim() }));
    }
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription(task.description);
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className={`group p-3 mb-2 rounded-lg shadow-sm transition-all duration-300 ${
      isDarkMode
        ? task.isDone 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-gray-800/30 border-gray-700'
        : task.isDone
          ? 'bg-gray-50 border-gray-100'
          : 'bg-white border-gray-100'
    } border hover:shadow-md`}>
      <div className="flex items-center">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border ${
            task.isDone 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : isDarkMode
                ? 'border-gray-600 hover:border-blue-400'
                : 'border-gray-300 hover:border-blue-500'
          } transition-colors duration-200 mr-3`}
          aria-label={task.isDone ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.isDone && <Check size={14} />}
        </button>
        
        {isEditing ? (
          <div className="flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full py-1 px-2 rounded focus:outline-none focus:ring-2 ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                  : 'bg-white border-blue-400 focus:ring-blue-300'
              } border`}
              maxLength={100}
            />
          </div>
        ) : (
          <span className={`flex-grow ${
            task.isDone
              ? isDarkMode 
                ? 'text-gray-400 line-through' 
                : 'text-gray-500 line-through'
              : ''
          }`}>
            {task.description}
          </span>
        )}
        
        <div className="flex gap-1 ml-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className={`text-emerald-500 hover:text-emerald-400 p-1 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label="Save changes"
              >
                <Check size={18} />
              </button>
              <button
                onClick={handleCancelEdit}
                className={`text-red-500 hover:text-red-400 p-1 rounded-full ${
                  isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label="Cancel editing"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className={`p-1 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
                    : 'text-gray-400 hover:text-blue-600 hover:bg-gray-100'
                }`}
                aria-label="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={handleDelete}
                className={`p-1 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                    : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
                }`}
                aria-label="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;