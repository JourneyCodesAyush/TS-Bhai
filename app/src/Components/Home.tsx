import React from "react";
import { GrJava } from "react-icons/gr";
import TextToSvgComponent from "./bhaiLang";

interface HomeProps {
  onPlaygroundClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onPlaygroundClick }) => {
  return (
    <main className="bg-[#121121] w-full min-h-screen flex flex-col justify-center ">
      <div className="flex gap-1 justify-center items-center justify-self-center">
        <GrJava size={110} color="#1e88e5" />
        <TextToSvgComponent
          className="stroke-2"
          fontSize={75}
          width={500}
          // height={500}
          fill="#ff5733"
        />
      </div>
      <div className="text-center">
        A Java implementation of the original{" "}
        <a
          className="text-orange-400 hover:text-orange-600"
          href="https://bhailang.js.org/"
        >
          BhaiLang
        </a>
      </div>
      <div className="flex gap-5 justify-center mt-5">
        <button
          onClick={onPlaygroundClick}
          className="mr-3 py-4 px-7 bg-orange-500 hover:bg-orange-600 font-bold  text-white rounded-md cursor-pointer"
        >
          Play here
        </button>
        <button
          onClick={() => {
            window.open(
              "https://github.com/journeycodesayush/javabhailang",
              "_blank"
            );
          }}
          className="ml-3 py-4 px-7 bg-white hover:bg-orange-200 font-bold text-orange-500  rounded-md cursor-pointer"
        >
          View Source
        </button>
      </div>
    </main>
  );
};

export default Home;
