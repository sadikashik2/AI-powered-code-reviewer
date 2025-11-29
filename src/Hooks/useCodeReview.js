import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function useCodeReview(selectedOption) {
  const [code, setCode] = useState("");
  const [prevCode, setPrevCode] = useState("");
  const [fixedCode, setFixedCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [changedLines, setChangedLines] = useState([]);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const decorationsRef = useRef([]);
  const latestChangedLinesRef = useRef([]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  // -------------------------------------------------------
  // ⭐ PERFECT LINE DETECTOR — EXACT CHANGED LINES ONLY
  // -------------------------------------------------------
  function detectChangedLines(oldCode, newCode) {
    const oldLines = oldCode.split("\n");
    const newLines = newCode.split("\n");

    const changed = [];
    const max = Math.max(oldLines.length, newLines.length);

    for (let i = 0; i < max; i++) {
      const oldLine = (oldLines[i] || "").trim();
      const newLine = (newLines[i] || "").trim();

      if (oldLine !== newLine) {
        changed.push(i); // <- highlight THIS exact line
      }
    }
    return changed;
  }

  async function reviewCode() {
    if (!code.trim()) return alert("Please enter code first.");
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `
You are a senior ${selectedOption.value} reviewer.
Give max 5 short bullet points summary.
Code:
${code}`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();

      const formatted = text
        .split("\n")
        .map((line) => line.trim())
        .filter((l) => l)
        .map((l) => "- " + l)
        .join("\n");

      setResponse(formatted);
    } catch (err) {
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleFixCode() {
    if (!code.trim()) return alert("Please enter code to fix.");
    setLoading(true);
    setResponse("");

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
Fix the following ${selectedOption.value} code.
### RETURN STRICT JSON:
{
  "fixed": "full corrected code",
  "changes": [
     { "old": "old line text", "new": "new line text" }
  ]
}
Do NOT include line numbers.
Code:
${code}
`;

      const result = await model.generateContent(prompt);
      let output = (await result.response.text()).replace(/```json|```/g, "").trim();

      let json;
      try {
        json = JSON.parse(output);
      } catch (err) {
        setResponse("AI returned invalid JSON.");
        setLoading(false);
        return;
      }

      const fixed = json.fixed || "";
      const changes = json.changes || [];

      setPrevCode(code);
      setFixedCode(fixed);

      // ⭐ Detect exact changed lines line-by-line
      const exactLines = detectChangedLines(code, fixed);
      latestChangedLinesRef.current = exactLines;
      setChangedLines(exactLines);

      // Update editor instantly
      editorRef.current?.setValue(fixed);
      setCode(fixed);

      // Highlight lines in editor
      applyHighlight(exactLines);

      // Create clean summary
      let summary = `### 🔧 Fixed Code Summary\n`;

      if (changes.length === 0) {
        summary += "No changes detected.\n";
      } else {
        changes.forEach((c) => {
          summary += `**Old:** ${c.old}\n**New:** ${c.new}\n\n`;
        });
      }

      setResponse(summary);
    } catch (err) {
      setResponse("Error fixing code: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // -------------------------------------------------------
  // ⭐ Highlight exact line (Monaco uses 1-based index)
  // -------------------------------------------------------
  function applyHighlight(lines) {
    if (!editorRef.current || !monacoRef.current) return;

    const monaco = monacoRef.current;

    const decorations = lines.map((line) => ({
      range: new monaco.Range(line + 1, 1, line + 1, 1),
      options: { isWholeLine: true, className: "highlight-line" },
    }));

    decorationsRef.current = editorRef.current.deltaDecorations(
      decorationsRef.current,
      decorations
    );

    if (lines.length > 0) {
      editorRef.current.revealLineInCenter(lines[0] + 1);
    }
  }

  function applyFix() {
    if (!fixedCode) return alert("Run Fix Code first.");
    editorRef.current?.setValue(fixedCode);
    setCode(fixedCode);

    applyHighlight(latestChangedLinesRef.current);
  }

  function undoFix() {
    if (!prevCode) return alert("Nothing to undo.");
    editorRef.current?.setValue(prevCode);
    setCode(prevCode);

    decorationsRef.current = editorRef.current.deltaDecorations([], []);
    setChangedLines([]);
  }

  return {
    code,
    setCode,
    response,
    loading,
    changedLines,
    editorRef,
    monacoRef,
    decorationsRef,
    handleEditorMount,
    reviewCode,
    handleFixCode,
    applyFix,
    undoFix,
  };
}
