import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import LanguageSelector from "./components/LanguageSelector";
import ButtonsPanel from "./components/ButtonsPanel";
import MobileTabs from "./components/MobileTabs";
import EditorPanel from "./components/EditorPanel";
import ResponsePanel from "./components/ResponsePanel";
import useCodeReview from "./Hooks/useCodeReview";
import { RingLoader } from "react-spinners";

export default function App() {
  const languageOptions = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "php", label: "PHP" },
    { value: "dart", label: "Dart" },
    { value: "bash", label: "Bash" },
    { value: "swift", label: "Swift" },
  ];

  const [selectedOption, setSelectedOption] = useState(languageOptions[0]);
  const [activeTab, setActiveTab] = useState("editor");

  const {
    code,
    setCode,
    response,
    loading,
    changedLines,
    editorRef,
    monacoRef,
    decorationsRef,
    reviewCode,
    handleFixCode,
    applyFix,
    undoFix,
  } = useCodeReview(selectedOption);

  return (
    <div className="min-h-screen bg-neutral-900 text-slate-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-4 items-center">
          <div className="col-span-1 md:col-span-2 cursor-pointer">
            <LanguageSelector
              options={languageOptions}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </div>

          <div className="col-span-1 md:col-span-4">
            <ButtonsPanel
              reviewCode={reviewCode}
              handleFixCode={handleFixCode}
              applyFix={applyFix}
              undoFix={undoFix}
            />
          </div>

          <div className="col-span-1 md:col-span-6 text-xs text-slate-400 mt-2 md:mt-0">
            {loading ? (
              <span className="flex gap-2 items-center">
                <RingLoader size={14} color="#7c3aed" /> Processing...
              </span>
            ) : (
              <span>
                Language: <strong>{selectedOption.label}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Mobile Tabs */}
        <MobileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Editor and Response Panels */}
        <div className="bg-neutral-800 rounded-xl shadow-md overflow-hidden md:flex">
          <EditorPanel
            code={code}
            setCode={setCode}
            language={selectedOption.value}
            editorRef={editorRef}       
            monacoRef={monacoRef}       
            decorationsRef={decorationsRef} 
            activeTab={activeTab}
            changedLines={changedLines}
            height="100%"
          />

          <ResponsePanel
            response={response}
            loading={loading}
            activeTab={activeTab}
          />
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Tip: On mobile, switch using tabs.
        </p>
      </div>
    </div>
  );
}
