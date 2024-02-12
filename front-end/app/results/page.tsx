"use client";
import { useRouter } from "next/navigation";
import React, { Component, useEffect, useState } from "react";

export default function Results() {
  // const history = useHistory();
  const [keyPressed, setKeyPressed] = useState(false);
  const router = useRouter();
  const newPage = () => {
    router.push("/presi");
  };

  useEffect(() => {
    const handleKeyPress = (event: { key: string }) => {
      // Check if the pressed key is "k" and the event hasn't occurred yet
      if (event.key.toLowerCase() === "k" && !keyPressed) {
        // Call your function here
        handleKeyPressFunction();

        // Set the flag to indicate that the event has occurred
        setKeyPressed(true);

        // Navigate to the '/presi' route
        newPage();
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [history, keyPressed]); // Include the flag and history in the dependency array

  const handleKeyPressFunction = () => {
    // Your logic when the "k" key is pressed
    console.log('Key "k" pressed!');
  };

  return (
    <main className="h-full">
      <div className="w-full max-w-3xl mx-auto px-4 md:px-8 flex items-center h-full fade-in">
        <h2 className="mb-8 -translate-y-14 flex mx-auto text-center">
          Le Président de la 7e Promotion de l'IDSI est
        </h2>
      </div>
    </main>
  );
}
