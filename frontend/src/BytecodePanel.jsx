import React from 'react';
import { Cpu, HelpCircle } from 'lucide-react';

export default function BytecodePanel({ frames, currentIndex }) {
  const currentFrame = frames[currentIndex];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-neutral-800 p-4 shadow-xl">
      {/* Panel Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800">
        <Cpu className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
          Compiled JVM Bytecode
        </h3>
      </div>

      {/* Assembly Instruction List Panel */}
      <div className="flex-1 bg-[#111111] rounded-lg p-2 border border-neutral-900 overflow-y-auto font-mono text-xs mb-3">
        {frames.length === 0 ? (
          <div className="text-center py-12 text-neutral-600 italic">
            [ Compile code to generate bytecode stream ]
          </div>
        ) : (
          frames.map((frame, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 my-1 rounded-md transition-all duration-150 ${
                  isActive
                    ? 'bg-amber-500/10 border border-amber-500 text-amber-400 font-bold shadow-sm'
                    : 'border border-transparent text-neutral-400 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-right font-semibold ${isActive ? 'text-amber-500' : 'text-neutral-600'}`}>
                    {idx}:
                  </span>
                  <span>{frame.currentInstruction}</span>
                </div>
                {isActive && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500 text-neutral-950 px-1.5 py-0.5 rounded animate-pulse">
                    Active PC
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Educational Explanation Box Footer */}
      <div className="bg-[#151515] rounded-lg p-3.5 border border-neutral-800 flex gap-3 min-h-[90px]">
        <HelpCircle className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
        <div className="font-mono text-xs">
          <div className="text-neutral-400 font-bold uppercase tracking-wider text-[10px] mb-1">
            Execution Walkthrough
          </div>
          <p className="text-neutral-300 leading-relaxed">
            {currentFrame?.stepExplanation || "Select or step into an active instruction line to trace its underlying architectural behavior."}
          </p>
        </div>
      </div>
    </div>
  );
}