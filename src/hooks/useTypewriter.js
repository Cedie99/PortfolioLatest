import { useState, useEffect, useCallback } from "react";

export function useTypewriter(strings, {
  typeSpeed = 60,
  deleteSpeed = 40,
  pauseDuration = 2000,
  loop = true,
} = {}) {
  const [displayText, setDisplayText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!strings.length) return;

    const currentString = strings[stringIndex];

    if (isComplete && !loop) return;

    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentString.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentString.slice(0, displayText.length + 1));
        }, typeSpeed);
      } else {
        timeout = setTimeout(() => {
          if (stringIndex === strings.length - 1 && !loop) {
            setIsComplete(true);
            return;
          }
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deleteSpeed);
      } else {
        setIsDeleting(false);
        setStringIndex((prev) => (prev + 1) % strings.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, pauseDuration, loop, isComplete]);

  return { displayText, isComplete, isDeleting };
}
