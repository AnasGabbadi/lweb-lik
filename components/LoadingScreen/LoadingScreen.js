"use client"; 

import { useState, useEffect } from "react";
import gsap from "gsap";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("loading");

    gsap.fromTo(
      ".loading-page",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 4,
        delay: 1,
        onComplete: () => {
          setIsLoading(false);
          document.body.classList.remove("loading"); 
        },
      }
    );

    gsap.fromTo(
      ".logo-name",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        delay: 1, 
      }
    );
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-page">
      <div className="logo-name">Lweb Lik</div>
    </div>
  );
}
