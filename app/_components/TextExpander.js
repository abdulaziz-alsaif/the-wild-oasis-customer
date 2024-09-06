"use client";

import { useState } from "react";

const MAX_CHARACTERS = 40;

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, MAX_CHARACTERS).join(" ") + "...";

  return (
    <p className="block max-h-[400px] overflow-hidden">
      {displayText}{" "}
      {children.length > MAX_CHARACTERS && (
        <button
          className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
}

export default TextExpander;
