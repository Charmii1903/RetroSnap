"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface PhotoBoothStartProps {
  onStart: () => void;
}

export default function PhotoBoothStart({ onStart }: PhotoBoothStartProps) {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-yellow-100 px-4 sm:px-6 md:px-8">
      {/* About Button */}
      <motion.div
        className="absolute top-4 right-4 sm:right-6"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 100 }}
      >
        <Button
          onClick={() => setShowAbout(true)}
          className="bg-orange-900 text-white mt-4 px-6 py-2 sm:px-8 sm:py-3 rounded transform rotate-6 hover:rotate-0 hover:bg-amber-700 transition-all"
        >
          About
        </Button>
      </motion.div>

      {/* Video in center */}
      <video
        className="w-full max-w-lg rounded-lg shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2"
        autoPlay
        loop
        muted
      >
        <source src="/videohome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-[prata] italic mt-6 text-orange-800 text-center leading-tight">
        Welcome to RetroSnap Photobooth
      </h1>

      {/* Start button */}
      <motion.button
        onClick={onStart}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-orange-800 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 font-[prata] mt-4 rounded flex items-center text-sm sm:text-base transition-all"
      >
        Click Click
        <motion.img
          src="/camera.png"
          alt="Camera Icon"
          className="ml-2 h-8 w-6 sm:h-10 sm:w-8"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </motion.button>

      {/* About Popup */}
      {showAbout && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg text-center">
            <h2 className="text-2xl font-bold text-gray-700">About Us</h2>
            <p className="mt-2 text-gray-700 text-sm sm:text-base leading-relaxed">
              Welcome to RetroSnap Photobooth – your gateway to a fun and
              unforgettable digital photobooth experience! Capture memories,
              strike a pose, and enjoy the magic of instant snapshots. Designed
              with love by Charmi, RetroSnap is all about bringing joy,
              creativity, and a touch of nostalgia to every click. So go ahead,
              snap away, and let the good times roll! ❤️
            </p>
            <Button
              onClick={() => setShowAbout(false)}
              className="mt-4 bg-orange-800 hover:bg-amber-700 text-white px-4 py-2 rounded"
            >
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
