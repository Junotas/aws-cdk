import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center space-x-4 mt-8">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-16 h-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold text-center mt-8">Vite + React</h1>
      <div className="card flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
      </div>
      <p className="text-center mt-4">
        Edit <code className="bg-gray-200 p-1 rounded">src/App.tsx</code> and save to test HMR
      </p>
      <p className="text-center mt-4 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;