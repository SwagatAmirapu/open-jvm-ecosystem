import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import EditorWindow from './EditorWindow';
import BytecodePanel from './BytecodePanel';
import MemoryMatrix from './MemoryMatrix';

export default function App() {
  const [code, setCode] = useState(
    'int a = 5;\nint b = 10;\nint result = a + b;'
  );
  const [executionFrames, setExecutionFrames] = useState([]);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rainDrops, setRainDrops] = useState([]);

  // Generate randomized columns for the neon matrix rain backdrop
  useEffect(() => {
    const drops = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 6}s`,
      duration: `${4 + Math.random() * 5}s`,
      fontSize: `${10 + Math.random() * 8}px`,
      chars: Array.from({ length: 10 }).map(() => 
        String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))
      ).join('')
    }));
    setRainDrops(drops);
  }, []);

  const handleCompile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/compiler/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode: code }),
      });

      if (!response.ok) throw new Error(`Server fault: ${response.statusText}`);

      const data = await response.json();
      setExecutionFrames(data);
      if (data.length > 0) setCurrentFrameIndex(0);
    } catch (err) {
      setError(err.message || 'Failed to connect to the backend kitchen service.');
    } finally {
      setLoading(false);
    }
  };

  const stepForward = () => currentFrameIndex < executionFrames.length - 1 && setCurrentFrameIndex(prev => prev + 1);
  const stepBackward = () => currentFrameIndex > 0 && setCurrentFrameIndex(prev => prev - 1);
  const resetDebugger = () => executionFrames.length > 0 && setCurrentFrameIndex(0);

  const activeFrame = executionFrames[currentFrameIndex] || null;

  return (
    <div className="w-screen min-h-screen bg-[#050505] text-white flex flex-col antialiased relative overflow-hidden">
      
      {/* BACKGROUND MATRIC NEON RAIN SYSTEM LAYER */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-15 select-none z-0">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute top-0 text-emerald-400 font-mono animate-matrix-rain writing-mode-vertical"
            style={{
              left: drop.left,
              animationDelay: drop.delay,
              animationDuration: drop.duration,
              fontSize: drop.fontSize,
              textShadow: '0 0 8px rgba(52, 211, 153, 0.6)',
              writingMode: 'vertical-rl'
            }}
          >
            {drop.chars}
          </div>
        ))}
      </div>

      {/* CORE APPLICATION DASHBOARD FORMS (Z-10 to layer safely over rain) */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* TOP NAV BAR BRANDING UPDATED */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-neutral-900 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <h1 className="text-sm font-mono font-black tracking-widest uppercase bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              OpenJVM Studio // Source To Bytecode
            </h1>
          </div>
          {executionFrames.length > 0 && (
            <div className="flex items-center gap-2 bg-[#121212]/90 border border-neutral-800 px-3 py-1 rounded-md font-mono text-xs text-neutral-400">
              <span>Recipe Step:</span>
              <span className="text-amber-400 font-bold">{currentFrameIndex + 1} / {executionFrames.length}</span>
            </div>
          )}
        </header>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs font-mono text-red-400">
            ⚠️ <strong>Kitchen Exception Error:</strong> {error}
          </div>
        )}

        <main className="flex-1 p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0 overflow-y-auto">
          <div className="xl:col-span-5 h-[calc(100vh-140px)] min-h-[500px]">
            <EditorWindow code={code} setCode={setCode} onCompile={handleCompile} loading={loading} />
          </div>

          <div className="xl:col-span-7 flex flex-col gap-6 h-[calc(100vh-140px)] min-h-[500px]">
            {executionFrames.length > 0 && (
              <div className="flex items-center justify-center gap-4 bg-[#121212]/90 border border-neutral-800 p-3 rounded-xl shadow-lg backdrop-blur-md">
                <button onClick={stepBackward} disabled={currentFrameIndex <= 0} className="p-2 bg-neutral-900 rounded-lg text-neutral-300 disabled:opacity-20 hover:bg-neutral-800 transition-all cursor-pointer"><ArrowLeft className="w-4 h-4" /></button>
                <button onClick={resetDebugger} className="flex items-center gap-1.5 px-3 py-2 bg-neutral-900 rounded-lg font-mono text-xs text-neutral-300 hover:bg-neutral-800 transition-all cursor-pointer"><RotateCcw className="w-3.5 h-3.5" /><span>RESET DISH</span></button>
                <button onClick={stepForward} disabled={currentFrameIndex >= executionFrames.length - 1} className="p-2 bg-emerald-500 rounded-lg text-neutral-950 disabled:opacity-20 hover:bg-emerald-400 transition-all cursor-pointer"><ArrowRight className="w-4 h-4" /></button>
              </div>
            )}

            <div className="flex-1 min-h-0">
              <MemoryMatrix activeFrame={activeFrame} />
            </div>

            <div className="h-1/2 min-h-[220px]">
              <BytecodePanel frames={executionFrames} currentIndex={currentFrameIndex} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}