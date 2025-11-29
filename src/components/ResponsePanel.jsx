import React from "react";
import { RingLoader } from "react-spinners";

export default function ResponsePanel({ response, loading, activeTab }) {
  const formatResponse = (text) => {
    const headlineBgColor = "#7c3aed"; // headline background
    const bulletBgColor = "#1f2937"; // background for description

    return text
      .split("\n")
      .map((line) => {
        let cleanLine = line.trim();

        // Remove leading *, -, spaces
        cleanLine = cleanLine.replace(/^(\*|\-|\s)+/, "");

        if (cleanLine === "") return "";

        // Check for colon to separate headline and description
        const separatorIndex = cleanLine.indexOf(":");
        if (separatorIndex !== -1) {
          let headline = cleanLine.substring(0, separatorIndex).trim();
          const description = cleanLine.substring(separatorIndex + 1).trim();

          // Remove trailing stars from headline
          headline = headline.replace(/\*+$/, "");

          return `
            <div class="bullet-card" style="
              background-color: ${bulletBgColor};
              margin-bottom: 12px;
              padding: 12px;
              border-radius: 8px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">
              <span class="bullet-headline" style="
                background-color: ${headlineBgColor};
                padding: 2px 6px;
                border-radius: 4px;
                font-weight: bold;
              ">${headline}:</span>
              <span class="bullet-description" style="margin-left: 4px;">
                ${description}
              </span>
            </div>
          `;
        } else {
          return `
            <div class="bullet-card" style="
              background-color: ${bulletBgColor};
              margin-bottom: 12px;
              padding: 12px;
              border-radius: 8px;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">${cleanLine}</div>
          `;
        }
      })
      .join("\n");
  };

  return (
    <div
      className={`${
        activeTab === "editor" ? "hidden md:block" : "block"
      } w-full md:w-1/2`}
    >
      <div className="p-4 h-[72vh] md:h-[80vh] overflow-auto bg-neutral-900">
        <h3 className="text-lg font-medium mb-3">Response</h3>

        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <RingLoader color="#7c3aed" />
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: formatResponse(response || "No response yet."),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
