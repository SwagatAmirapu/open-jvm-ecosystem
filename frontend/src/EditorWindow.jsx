import React from 'react';
import { Code, Play } from 'lucide-react';

export default function EditorWindow({ code, setCode, onCompile, loading }) {
  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-xl border border-neutral-800 shadow-2xl overflow-hidden">
      {/* Tab Control Bar Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-neutral-300">OpenJVM_Sandbox.java</span>
        </div>
        
        {/* Compile Trigger Button */}
        <button
          onClick={onCompile}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wide shadow-md transition-all duration-200 ${
            loading 
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
              : 'bg-emerald-500 text-neutral-950 hover:bg-emerald-400 active:scale-95 cursor-pointer'
          }`}
        >
          <Play className={`w-3.5 h-3.5 fill-current ${loading ? 'animate-pulse' : ''}`} />
          {loading ? 'COMPILING...' : 'RUN PIPELINE'}
        </button>
      </div>

      {/* Code Input Workspace Area */}
      <div className="flex-1 relative font-mono text-sm leading-relaxed p-4 bg-[#111111]">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Type your execution logic here...&#10;int a = 5;&#10;int b = 10;&#10;int result = a + b;"
          className="w-full h-full bg-transparent text-emerald-400 outline-none resize-none font-mono selection:bg-neutral-800 selection:text-emerald-300"
          spellCheck="false"
        />
      </div>
    </div>
  );
}