import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function EditorPanel({
  code,
  setCode,
  language,
  editorRef,
  monacoRef,
  decorationsRef,
  activeTab,
  changedLines,
  height = "100%",
}) {
  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  // Highlight changed lines whenever changedLines updates
  useEffect(() => {
    if (!editorRef.current || !monacoRef.current || !decorationsRef) return;
    const monaco = monacoRef.current;

    const decorations = changedLines.map((line) => ({
      range: new monaco.Range(line, 1, line, 1),
      options: { isWholeLine: true, className: "highlight-line" },
    }));

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current || [],
      decorations
    );

    if (changedLines.length > 0) {
      editorRef.current.revealLineInCenter(changedLines[0]);
    }
  }, [changedLines, editorRef, monacoRef, decorationsRef]);

  return (
    <div
      className={`${
        activeTab === "response" ? "hidden md:block" : "block"
      } w-full md:w-1/2 border-b md:border-r border-neutral-700`}
    >
      <div className="p-2 h-[62vh] md:h-[78vh]">
        <Editor
          height={height}
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(v) => setCode(v || "")}
          onMount={handleEditorMount}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: "on",
            smoothScrolling: true,
            placeholder: "Paste your code here..." // placeholder hint
          }}
        />
      </div>
    </div>
  );
}
