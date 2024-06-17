import { useState } from "react";

export default function Clipboard({ hexColor }) {
  const [copyButtonText, setCopyButtonText] = useState("COPY");

  async function handleCopyToClipboard(hexColor) {
    try {
      await navigator.clipboard.writeText(hexColor);
      setCopyButtonText("SUCCESSFULLY COPIED");
      setTimeout(() => {
        setCopyButtonText("COPY");
      }, 3000);
    } catch (error) {
      console.error("Failed to copy hex code: ", error.message);
    }
  }

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setCopyButtonText("COPY");
  //     }, 3000);
  //   }, [copyButtonText]);

  return (
    <button type="button" onClick={() => handleCopyToClipboard(hexColor)}>
      {copyButtonText}
    </button>
  );
}
