import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <div className="m-auto bg-gray-600 h-0.5 mt-4 mb-3 w-[90vw]"></div>
        <div className="text-center py-3 text-[1em]">
          Made with <span className="text-orange-600">&hearts;</span> by{" "}
          <a
            className="text-orange-600"
            href="https://github.com/journeycodesayush"
            target="_blank"
          >
            @journeycodesayush
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
