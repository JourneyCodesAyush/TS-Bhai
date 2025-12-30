import React, { useState, useRef } from "react";
import TerminalOutput from "./TerminalOutput";

import { runBhaiLang } from "../../../package/core/runner";
import type { RunResult } from "../../../package/core/runner";

const PlayGround: React.FC = () => {
  const [code, setCode] = useState<string>(
    'bhai ye hai a = "Hello";\nbol bhai a, " bhai log!"'
  );
  const [output, setOutput] = useState<string[]>(["Hello bhai log!"]);
  const [errors, setErrors] = useState<string[]>([]);

  const lineCount: number = code.split("\n").length;

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineRef = useRef<HTMLPreElement | null>(null);

  const handleScroll = () => {
    if (!textAreaRef.current || !lineRef.current) {
      return;
    }
    lineRef.current.scrollTop = textAreaRef.current.scrollTop;
  };

  const handleClear = () => {
    setCode("");
    setOutput([]);
    setErrors([]);
  };

  const handleRun = () => {
    // Handle with exposed API from ../package/..
    const result: RunResult = runBhaiLang(code);

    setOutput(result.output);
    setErrors(result.errors);
  };

  return (
    <>
      <div className="playground mx-4 mb-8">
        <div className="flex justify-between items-center" id="playground">
          <h1 className="font-extrabold text-4xl text-gray-100 py-0.5 my-4 tracking-tight">
            PlayGround
          </h1>
          <div className="flex gap-2">
            <div className="">
              <button
                onClick={handleRun}
                className="ml-3 py-4 px-7 bg-white hover:bg-orange-200 font-bold text-orange-500  rounded-md cursor-pointer mx-2 "
              >
                Run
              </button>
            </div>
            <div className="">
              <button
                onClick={handleClear}
                className="mr-3 py-4 px-7 bg-orange-500 hover:bg-orange-600 font-bold  text-white rounded-md cursor-pointer  mx-2"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center min-w-[50vw] h-[50vh] overflow-hidden">
          <pre
            ref={lineRef}
            className="text-right pr-2 select-none border-gray-400 py-2 overflow-y-hidden"
            style={{
              width: "40px",
              fontFamily: "Fira Code, monospace",
              lineHeight: "1.5rem",
            }}
          >
            {Array.from({ length: lineCount }, (_, i) => i + 1).join("\n")}
          </pre>

          <textarea
            ref={textAreaRef}
            value={code}
            onScroll={handleScroll}
            onChange={(e) => setCode(e.target.value)}
            className="w-[80vw] h-[50vh] leading-6  bg-[#333333] text-white rounded-md focus:outline-none px-3 py-2 resize-none overflow-y-auto"
          />
        </div>
      </div>
      <TerminalOutput output={output} errors={errors} />
    </>
  );
};

export default PlayGround;
