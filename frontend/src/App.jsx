import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import EditorWindow from './EditorWindow';
import BytecodePanel from './BytecodePanel';
import MemoryMatrix from './MemoryMatrix';

export default function App() {
  // 1. Central Application State Containers
  const [code, setCode] = useState(
    'int a = 5;\nint b = 10;\nint result = a + b;'
  );
  const [executionFrames, setExecutionFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Asynchronous API Compiler Pipeline Trigger
  const handleCompile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/compiler/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode: code }),
      });

      if (!response.ok) {
        throw new Error(`Server execution fault: ${response.statusText}`);
      }

      const data = await response.json();
      setExecutionFrames(data);
      
      // Automatically snap to the first compiled instruction frame if array is populated
      if (data.length > 0) {
        setCurrentFrameIndex(0);
      } else {
        setCurrentFrameIndex(-1);
        setError("Code parsed, but generated no execution operations.");
      }
    } catch (err) {
      setError(err.message || 'Failed to establish pipeline connection with backend service.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Clock Cycle Stepper Step Handlers
  const stepForward = () => {
    if (currentFrameIndex < executionFrames.length - 1) {
      setCurrentFrameIndex((prev) => prev + 1);
    }
  };

  const stepBackward = () => {
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex((prev) => prev - 1);
    }
  };

  const resetDebugger = () => {
    if (executionFrames.length > 0) {
      setCurrentFrameIndex(0);
    }
  };

  const activeFrame = executionFrames[currentFrameIndex] || null;

  return (
    <div className="w-screen min-h-screen bg-[#0a0a0a] text-white flex flex-col antialiased">
      
      {/* GLOBAL SYSTEM STATUS TOP NAV BAR */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#111111] border-b border-neutral-900 shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h1 className="text-sm font-mono font-bold tracking-wider uppercase text-neutral-200">
            OpenJVM // Educational Runtime Studio
          </h1>
        </div>
        {executionFrames.length > 0 && (
          <div className="flex items-center gap-2 bg-[#181818] border border-neutral-800 px-3 py-1 rounded-md font-mono text-xs text-neutral-400">
            <span>Cycle Step:</span>
            <span className="text-amber-400 font-bold">
              {currentFrameIndex + 1} / {executionFrames.length}
            </span>
          </div>
        )}
      </header>

      {/* ERROR TRACKING ALERTS HUD */}
      {error && (
        <div className="mx-6 mt-4 p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs font-mono text-red-400">
          ⚠️ <strong>Pipeline Exception Error:</strong> {error}
        </div>
      )}

      {/* MAIN SYSTEM DASHBOARD PANEL SPACE */}
      <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
        
        {/* LEFT COLUMN: SOURCE WORKSPACE WINDOW (40% Width) */}
        <div className="xl:col-span-5 h-[calc(100vh-140px)] min-h-[500px]">
          <EditorWindow 
            code={code} 
            setCode={setCode} 
            onCompile={handleCompile} 
            loading={loading} 
          />
        </div>

        {/* RIGHT COLUMN: BYTECODE INTERACTION & MEMORY MATRIX HUD (60% Width) */}
        <div className="xl:col-span-7 flex flex-col gap-6 h-[calc(100vh-140px)] min-h-[500px]">
          
          {/* TOP SECTION: STEP-BY-STEP DEBUGGING PLAYER WRAPPER */}
          {executionFrames.length > 0 && (
            <div className="flex items-center justify-center gap-4 bg-[#141414] border border-neutral-800 p-3 rounded-xl shadow-lg">
              <button
                onClick={stepBackward}
                disabled={currentFrameIndex <= 0}
                className="p-2 bg-neutral-800 rounded-lg text-neutral-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
                title="Step Backward"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={resetDebugger}
                className="flex items-center gap-1.5 px-3 py-2 bg-neutral-800 rounded-lg font-mono text-xs text-neutral-300 hover:bg-neutral-700 active:scale-95 transition-all cursor-pointer"
                title="Reset Execution Thread"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>

              <button
                onClick={stepForward}
                disabled={currentFrameIndex >= executionFrames.length - 1}
                className="p-2 bg-emerald-500 rounded-lg text-neutral-950 disabled:bg-neutral-800 disabled:text-neutral-600 disabled:cursor-not-allowed hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                title="Step Forward"
              >
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          )}

          {/* MIDDLE SECTION: CORE WORKSPACE MEMORY MONITOR PANEL GRID */}
          <div className="flex-1 min-h-0">
            <MemoryMatrix activeFrame={activeFrame} />
          </div>

          {/* BOTTOM SECTION: COMPILED BYTECODE STREAM PANEL PANEL */}
          <div className="h-1/2 min-h-[220px]">
            <BytecodePanel frames={executionFrames} currentIndex={currentFrameIndex} />
          </div>

        </div>
      </main>
    </div>
  );
}