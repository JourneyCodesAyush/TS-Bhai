import React from "react";

interface TerminalOutputProps {
  output: string[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="bg-black text-white py-2 px-4 min-w-[70vw] max-w-2xl rounded-md font-mono overflow-auto">
        {output}
        {output.map((o) => {
          return <div key={o}>{o}</div>;
        })}
      </div>
    </div>
  );
};

export default TerminalOutput;
