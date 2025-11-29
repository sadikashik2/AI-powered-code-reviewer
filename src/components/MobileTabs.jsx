import React from "react";

export default function MobileTabs({ activeTab, setActiveTab }) {
  return (
    <div className="md:hidden flex text-xs mb-2">
      <button
        onClick={() => setActiveTab("editor")}
        className={`flex-1 px-3 py-2 ${
          activeTab === "editor"
            ? "bg-neutral-900 text-white"
            : "bg-neutral-800 text-slate-400"
        } cursor-pointer`}
      >
        Editor
      </button>

      <button
        onClick={() => setActiveTab("response")}
        className={`flex-1 px-3 py-2 ${
          activeTab === "response"
            ? "bg-neutral-900 text-white"
            : "bg-neutral-800 text-slate-400"
        } cursor-pointer`}
      >
        Response
      </button>
    </div>
  );
}
