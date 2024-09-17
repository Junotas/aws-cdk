import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-8">Vite + React</h1>
      <div className="card flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
      <p className="text-center mt-4">
        Edit <code className="bg-gray-200 p-1 rounded">src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
}

export default App;