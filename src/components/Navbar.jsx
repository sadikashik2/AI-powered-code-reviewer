import React from "react";
import { BrainCircuit } from "lucide-react";

export default function Navbar() {
  return (
    <div className="h-[70px] flex items-center px-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900/80 backdrop-blur-md border-b border-purple-600/20 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <BrainCircuit
          size={28}
          className="text-violet-500"
        />
        <span className="text-xl font-bold tracking-wide text-gray-400">
          CheckMyCode
        </span>
      </div>

      
    </div>
  );
}
