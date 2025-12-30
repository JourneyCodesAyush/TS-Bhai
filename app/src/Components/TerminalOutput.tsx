import React from "react";

interface TerminalOutputProps {
  output: string[];
  errors?: string[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  output,
  errors = [],
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-black text-white py-2 px-4 min-w-[70vw] max-w-2xl rounded-md font-mono overflow-auto">
        {output.map((line, i) => (
          <div key={`out-${i}`} className="text-white">
            {line}
          </div>
        ))}
        {errors.map((err, i) => (
          <div key={`err-${i}`} className="text-red-500">
            {err}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TerminalOutput;
