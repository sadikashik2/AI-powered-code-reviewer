import { RefreshCcw, Check, Zap, RotateCcw } from "lucide-react";

export default function ControlButtons({ reviewCode, handleFixCode, applyFix, undoFix }) {
  return (
    <>
      <button onClick={reviewCode} className="btn-grey">
        <RefreshCcw size={16} /> Review
      </button>

      <button onClick={handleFixCode} className="btn-green">
        <Check size={16} /> Fix Code
      </button>

      <button onClick={applyFix} className="btn-blue">
        <Zap size={16} /> Apply Fix
      </button>

      <button onClick={undoFix} className="btn-red">
        <RotateCcw size={16} /> Undo
      </button>
    </>
  );
}
