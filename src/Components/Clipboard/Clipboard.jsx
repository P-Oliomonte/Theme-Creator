import "./Clipboard.css";
import { useState, useEffect } from "react";

export default function Clipboard({ hexColor }) {
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  async function handleCopyToClipboard(hexColor) {
    try {
      await navigator.clipboard.writeText(hexColor);
      setCopyButtonText("SUCCESSFULLY COPIED");
    } catch (error) {
      console.error("Failed to copy hex code: ", error.message);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCopyButtonText("COPY");
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, [copyButtonText]);

  return (
    <button
      className="button-with-space"
      type="button"
      onClick={() => handleCopyToClipboard(hexColor)}
    >
      {copyButtonText}
    </button>
  );
}
