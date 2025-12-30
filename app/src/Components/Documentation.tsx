import React from "react";

import "../syntax";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // dark theme
import { documentation } from "../data/documentation";

const Documentation: React.FC = () => {
  return (
    <div className="mx-8">
      <div className="flex flex-col justify-between items-center">
        <h1 className="font-extrabold text-4xl text-gray-100 py-0.5 my-4 tracking-tight">
          Documentation
        </h1>
        <p>
          JavaBhaiLang is a re-implementation of BhaiLang (originally
          implemented in TS)
        </p>
      </div>
      <div className="details grid grid-cols-2 gap-x-6 gap-y-4">
        {documentation.map((section) => {
          return (
            <div key={section.title} className="flex flex-col font-bold mt-3">
              <div className="bg-gray-600 h-0.5 mt-4 mb-3"></div>
              <span className="text-2xl my-3">{section.title}</span>
              <div className="general-info font-normal">
                {section.description}

                {section.examples.map((code, idx) => {
                  return (
                    <pre key={idx} className="bg-[#333333] px-3 py-2 my-6">
                      <code
                        dangerouslySetInnerHTML={{
                          __html: Prism.highlight(
                            code,
                            Prism.languages.bhaiLang,
                            "bhaiLang"
                          ),
                        }}
                        className="whitespace-pre"
                      />
                    </pre>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Documentation;
