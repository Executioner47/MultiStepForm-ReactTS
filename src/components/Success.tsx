import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export default function Success() {
  let [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  function handleWindowResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  const confettiConfig = {
    size: 8,
    shape: "circle",
    colors: ["#f44336", "#9c27b0", "#3f51b5"],
    wind: 0,
    gravity: 0.2,
    numberOfPieces: 300,
    innerWidth: windowSize.width,
    innerHeight: windowSize.height,
  };
  useEffect(() => {
    window.onresize = () => handleWindowResize();
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  }, []);
  return (
    <div className="overflow-hidden md:w-3/5 md:mt-8 flex flex-col justify-center items-center md:-ml-5 -bg--clr-White md:bg-transparent mt-52 p-7 md:p-0 rounded-lg z-20">
      {showConfetti && <Confetti {...confettiConfig} />}
      <div className="bg-[#f9818d] rounded-full p-3 inline-block ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 32 32"
        >
          <circle
            cx="16"
            cy="16"
            r="10"
            stroke="white"
            strokeWidth="4"
            fill="white"
          />
          <path
            fill="none"
            stroke="#f9818d"
            strokeWidth="2"
            d="m9.333 16 4.667 4.667L23.333 12"
          />
        </svg>
      </div>
      <h1 className="-text--clr-Marine-Blue font-bold text-4xl mt-6 mb-4">
        Thank You
      </h1>
      <p className="-text--clr-Cool-Gray md:w-[440px] text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
}
