import "./App.css";
import Home from "./Components/Home";
import PlayGround from "./Components/PlayGround";
import Documentation from "./Components/Documentation";
import Footer from "./Components/Footer";

import { useRef } from "react";

function App() {
  const scrollToPlayGround = useRef<HTMLDivElement | null>(null);

  const handleScrollToPlayGround = () => {
    scrollToPlayGround.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <>
      <Home onPlaygroundClick={handleScrollToPlayGround} />
      <PlayGround playGroundRef={scrollToPlayGround} />
      <Documentation />
      <Footer />
    </>
  );
}

export default App;
