import React from "react";
import { Check, RefreshCcw, RotateCcw, Zap } from "lucide-react";

export default function ButtonsPanel({ reviewCode, handleFixCode, applyFix, undoFix }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2">
      <button
        onClick={reviewCode}
        className="flex justify-center items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-full text-sm font-medium cursor-pointer w-full"
      >
        <RefreshCcw size={16} /> Review
      </button>

      <button
        onClick={handleFixCode}
        className="flex justify-center items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-full text-sm font-medium cursor-pointer w-full"
      >
        <Check size={16} /> Fix Code
      </button>

      <button
        onClick={applyFix}
        className="flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-medium cursor-pointer w-full"
      >
        <Zap size={16} /> Apply Fix
      </button>

      <button
        onClick={undoFix}
        className="flex justify-center items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-full text-sm font-medium cursor-pointer w-full"
      >
        <RotateCcw size={16} /> Undo
      </button>
    </div>
  );
}
