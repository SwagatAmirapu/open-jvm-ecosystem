import React from 'react';
import { Layers, Database } from 'lucide-react';

export default function MemoryMatrix({ activeFrame }) {
  // Gracefully fallback to empty structures if no compilation has executed yet
  const stack = activeFrame?.operandStack || [];
  const registers = activeFrame?.localVariables || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      
      {/* COLUMN 1: VIRTUAL OPERAND STACK (LIFO FRAME) */}
      <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-neutral-800 p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
            JVM Operand Stack Frame
          </h3>
        </div>

        <div className="flex-1 flex flex-col justify-end bg-[#111111] rounded-lg p-4 border border-neutral-900 overflow-y-auto">
          {stack.length === 0 ? (
            <div className="text-center my-auto font-mono text-xs text-neutral-600 italic">
              [ Stack Frame Empty ]
            </div>
          ) : (
            // Render from top down to maintain standard visual LIFO behavior
            [...stack].reverse().map((value, idx) => {
              const reverseIdx = stack.length - 1 - idx;
              return (
                <div
                  key={reverseIdx}
                  className="w-full py-2.5 mb-2 bg-cyan-950/40 border border-cyan-800 text-cyan-400 font-mono text-xs font-bold text-center rounded-md shadow-md animate-fade-in-down"
                >
                  Slot {reverseIdx} : <span className="text-white bg-cyan-900/60 px-2 py-0.5 rounded ml-1">{value}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* COLUMN 2: LOCAL VARIABLE ARRAY REGISTERS */}
      <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-neutral-800 p-4 shadow-xl">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-neutral-800">
          <Database className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
            Local Variable Registers
          </h3>
        </div>

        <div className="flex-1 bg-[#111111] rounded-lg p-4 border border-neutral-900 overflow-y-auto">
          {Object.keys(registers).length === 0 ? (
            <div className="text-center h-full flex items-center justify-center font-mono text-xs text-neutral-600 italic">
              [ No Active Registers ]
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(registers).map(([name, value], index) => (
                <div
                  key={name}
                  className="flex items-center justify-between p-3 bg-purple-950/20 border border-purple-900/60 rounded-lg font-mono text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-medium">_{index + 1}</span>
                    <span className="text-purple-400 font-bold">{name}</span>
                    <span className="text-neutral-600 text-[10px] bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800">int</span>
                  </div>
                  <div className="text-white font-bold bg-purple-900/40 px-2.5 py-1 rounded border border-purple-800/40">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}