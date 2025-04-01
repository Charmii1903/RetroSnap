"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CustomizePhotostripProps {
  onComplete: (backgroundColor: string, frameColor: string, sticker: string | null) => void;
}

export default function CustomizePhotostrip({ onComplete }: CustomizePhotostripProps) {
  const [backgroundColor, setBackgroundColor] = useState("#FFF9D6"); // Default light yellow
  const [frameColor, setFrameColor] = useState("#C599B6"); // Default light pink
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const frameColors = ["#FFB6C1", "#B6D0FF", "#D6FFB6", "#FFD6B6", "#D6B6FF", "#000000", "#FF5733","#B03052","#FFA725","#0D4715","#706D54","#F6F1DE","#2D3250","#6C4E31"];
  const backgroundColors = ["#C599B6", "#E6F9FF", "#CDC1FF", "#FFB4A2", "#C6E2FF", "#FADADD", "#CCE0AC","#F0EAAC","#EF9C66","#CA8787","#F19ED2","#D1BB9E","#E5E1DA","#7BD3EA"];

  const stickers = ["sticker1", "sticker2", "sticker3", "sticker4", "sticker5", "sticker6", "sticker7", "sticker8"];

  const handleStickerSelect = (sticker: string) => {
    setSelectedSticker(selectedSticker === sticker ? null : sticker);
  };

  const handleComplete = () => {
    onComplete(backgroundColor, frameColor, selectedSticker);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-yellow-100 to-orange-200">
      {/* About Button */}
      <motion.div className="absolute top-4 right-4 sm:right-6" whileHover={{ opacity: 1 }} initial={{ opacity: 100 }}>
        <Button 
          onClick={() => setShowAbout(true)}
          className="bg-orange-900 text-white px-6 py-2 sm:px-8 rounded transform rotate-6 hover:rotate-0 hover:bg-amber-700 transition-all"
        >
          About
        </Button>
      </motion.div>

      <div className="max-w-md w-full px-4">
        <h2 className="text-3xl sm:text-4xl text-center text-orange-800 mb-6 sm:mb-8 font-[prata]">Customize the Photoframe</h2>

        {/* Photostrip Color Selection */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg mb-2 font-[prata] text-orange-800">Photostrip Colour:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {frameColors.map((color) => (
              <button key={color} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${frameColor === color ? "ring-2 ring-orange-800 ring-offset-2" : ""}`} style={{ backgroundColor: color }} onClick={() => setFrameColor(color)} aria-label={`Select frame color ${color}`} />
            ))}
          </div>
        </div>

        {/* Background Color Selection */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg mb-2 font-[prata] text-orange-800">Background Colour:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {backgroundColors.map((color) => (
              <button key={color} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${backgroundColor === color ? "ring-2 ring-orange-800 ring-offset-2" : ""}`} style={{ backgroundColor: color }} onClick={() => setBackgroundColor(color)} aria-label={`Select background color ${color}`} />
            ))}
          </div>
        </div>

        {/* Sticker Selection */}
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg mb-2 font-[prata] text-orange-800">Sticker:</h3>
          <div className="grid grid-cols-4 gap-2">
            {stickers.map((sticker) => (
              <button key={sticker} className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md ${selectedSticker === sticker ? "ring-2 ring-orange-800 ring-offset-2" : ""}`} onClick={() => handleStickerSelect(sticker)}>
                <img src={`/${sticker}.png`} alt={sticker} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button onClick={handleComplete} className="bg-orange-800 hover:bg-amber-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded">
            Continue
          </Button>
        </div>
      </div>
      
      {/* About Popup */}
      {showAbout && (
        <motion.div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-700 font-[prata]">About Us</h2>
            <p className="mt-2 text-gray-700 font-[prata] text-sm sm:text-base">Welcome to RetroSnap Photobooth – your gateway to a fun and unforgettable digital photobooth experience! Capture memories, strike a pose, and enjoy the magic of instant snapshots. Designed with love by Charmi, RetroSnap is all about bringing joy, creativity, and a touch of nostalgia to every click. So go ahead, snap away, and let the good times roll! ❤️</p>
            <Button onClick={() => setShowAbout(false)} className="mt-4 bg-orange-800 hover:bg-amber-700 text-white px-4 py-2 rounded">Close</Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
