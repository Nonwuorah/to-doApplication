import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AddTask from './components/AddTask';
import ListTask from './components/ListTask';
import TaskFilter from './components/TaskFilter';
import { CheckCircle2, Sun, Moon } from 'lucide-react';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Provider store={store}>
      <div
        className={`min-h-screen bg-gradient-to-br transition-colors duration-300 ${
          isDarkMode
            ? 'from-gray-900/95 to-blue-900/95 text-gray-100'
            : 'from-gray-50/95 to-blue-50/95 text-gray-800'
        }`}
      >
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg")',
          }}
        />

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <header className="mb-8 text-center relative">
            <button
              onClick={toggleTheme}
              className={`absolute right-0 top-0 p-2 rounded-full transition-colors duration-200 ${
                isDarkMode
                  ? 'text-yellow-300 hover:bg-gray-800'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2
                size={28}
                className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
              />
              <h1 className="text-2xl font-bold">NedTask</h1>
            </div>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Organize your tasks with ease
            </p>
          </header>

          <main
            className={`backdrop-blur-sm rounded-xl shadow-lg p-6 transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
            }`}
          >
            <AddTask />
            <TaskFilter />
            <ListTask />
          </main>

          <footer
            className={`mt-8 text-center text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            <p>NedTask &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </Provider>
  );
}

export default App;
