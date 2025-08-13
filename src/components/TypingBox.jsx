import React, { useEffect, useRef, useState } from "react";

function TypingBox() {
  const sampleText = [
    "The quick brown fox jumps over the lazy dog",
    "one day a horse rode to the doctor",
    "a drunk man was arrested for driving under the influence of alcohol",
    "the moon was full so we went to the beach",
    "the cat sat on the mat",
    "someone stole my wallet and I was so angry",
    "hello cody are you ready for the test",
    "hawkeye is the most useless character in the Avengers",
  ];

  const [isDone, setIsDone] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [text, setText] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setText(sampleText[Math.floor(Math.random() * sampleText.length)]);
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setUserInput(val);
    if (!startTime) setStartTime(Date.now());
    if (val.length === text.length) {
      setEndTime(Date.now());
      setIsDone(true);
    }
  }

  function calculateWPM() {
    const words = text.trim().split(" ").filter(Boolean).length;
    const timeTaken = (endTime - startTime) / 1000 / 60;
    return Math.round(words / timeTaken);
  }

  function calculateAccuracy() {
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === text[i]) correct++;
    }
    return Math.round((correct / userInput.length) * 100);
  }

  function resetTest() {
    const newText = sampleText[Math.floor(Math.random() * sampleText.length)];
    setText(newText);
    setUserInput("");
    setIsDone(false);
    setStartTime(null);
    setEndTime(null);
    inputRef.current.focus();
  }

  function getColoredText() {
    return text.split("").map((char, index) => {
      let className = "";
      if (index < userInput.length) {
        className =
          userInput[index] === char ? "text-green-500" : "text-red-500";
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <p className="text-lg font-semibold mb-3 text-left">{getColoredText()}</p>
      <textarea
        className="bg-gray-700 w-full rounded-lg p-2 outline-none focus:ring-blue-500 focus:ring-2"
        rows="4"
        disabled={isDone}
        ref={inputRef}
        onChange={handleChange}
        placeholder="type here..."
        value={userInput}
      ></textarea>
      {isDone ? (
        <div className="text-left space-y-2 mt-4">
          <p>⏱ Time taken {(endTime - startTime) / 1000}s</p>
          <p>⚡ WPM {calculateWPM()}</p>
          <p>🎯 Accuracy {calculateAccuracy()}</p>
          <button
            onClick={resetTest}
            className="mt-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TypingBox;
