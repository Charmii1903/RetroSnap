"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

interface FinalPhotostripProps {
  photos: string[];
  note: string;
  backgroundColor: string;
  frameColor: string;
  stickers: string[] | null;
}

export default function FinalPhotostrip({
  photos,
  note,
  backgroundColor,
  frameColor,
  stickers,
}: FinalPhotostripProps) {
  const photostripRef = useRef<HTMLDivElement>(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleDownload = async () => {
    if (!photostripRef.current) return;

    try {
      const element = photostripRef.current;
      const scale = 3;

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        useCORS: true,
        scale: scale,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#fff";
        ctx.fillText(note, 20, 40);
      }

      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "photostrip_high_quality.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating high-quality download:", error);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-yellow-100 px-4 py-8">
      {/* About Button */}
      <motion.div
        className="absolute top-6 sm:top-7 right-6" 
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 100 }}
      >
        <Button
          onClick={() => setShowAbout(true)}
          className="bg-orange-900 text-white px-4 py-1 sm:px-6 sm:py-1 text-sm sm:text-base rounded transform rotate-6 hover:rotate-0 hover:bg-amber-700 transition-all"
        >
          About
        </Button>
      </motion.div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-[prata] text-orange-800 mt-10 sm:mt-10 mb-4 flex items-center gap-2 text-center">
        <img src="/print.png" alt="photo" className="w-20 h-20 sm:w-20 sm:h-20" />
        Printing your photo
      </h2>

      <div
        ref={photostripRef}
        className="relative p-4 sm:p-6 rounded-lg shadow-lg flex flex-col items-center border-4 overflow-hidden max-w-xs sm:max-w-md"
        style={{ backgroundColor }}
      >
        {/* Note */}
        {note && (
          <div
            className="absolute top-3 left-3 bg-[#C4A484] text-white px-2 py-1 rounded-md shadow-md text-xs sm:text-sm italic"
            style={{ transform: "rotate(-6deg)", transformOrigin: "left top", zIndex: 20 }}
          >
            {note}
          </div>
        )}

        {/* Stickers */}
        {stickers &&
          stickers.map((sticker, index) => (
            <img
              key={index}
              src={`/${sticker}.png`}
              alt={`Sticker ${index + 1}`}
              className="absolute w-8 h-8 sm:w-10 sm:h-10 opacity-80"
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                transform: `rotate(${Math.random() * 40 - 20}deg)`,
              }}
            />
          ))}

        <div className="relative flex flex-col gap-2 p-3 sm:p-4 rounded-lg shadow-xl" style={{ backgroundColor: frameColor }}>
          {photos.map((photo, index) => (
            <div key={index} className="w-24 h-24 sm:w-32 sm:h-32 bg-black rounded-md overflow-hidden">
              <img src={photo || "/placeholder.svg"} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Button onClick={handleDownload} className="bg-orange-800 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 rounded flex items-center">
          Download <Download className="ml-2 h-4 w-4" />
        </Button>

        <Button className="bg-orange-800 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 rounded flex items-center">
          Share <Share2 className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* About Popup */}
      {showAbout && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-700 font-[prata]">About Us</h2>
            <p className="mt-2 text-gray-700 font-[prata] text-sm sm:text-base">
              Welcome to RetroSnap Photobooth – your gateway to a fun and unforgettable digital photobooth experience!
              Capture memories, strike a pose, and enjoy the magic of instant snapshots. Designed with love by Charmi,
              RetroSnap is all about bringing joy, creativity, and a touch of nostalgia to every click. So go ahead,
              snap away, and let the good times roll! ❤️
            </p>
            <Button onClick={() => setShowAbout(false)} className="mt-4 bg-orange-800 hover:bg-amber-700 text-white px-4 py-2 rounded">
              Close
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
