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
  const handleShare = async () => {
    if (!photostripRef.current) return;

    try {
      const canvas = await html2canvas(photostripRef.current);
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (navigator.share) {
          try {
            const file = new File([blob], "photostrip.png", { type: "image/png" });
            await navigator.share({
              files: [file],
              title: "My Photostrip",
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          alert("Web Share API not supported in your browser");
        }
      });
    } catch (error) {
      console.error("Error generating share image:", error);
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
        className="relative p-6 sm:p-8 rounded-lg shadow-lg flex flex-col items-center border-4 overflow-hidden max-w-xs sm:max-w-md"
        style={{ backgroundColor, minHeight: "500px" }} // Increase min-height
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

        <div
          className="relative flex flex-col gap-3 p-6 sm:p-8 rounded-lg shadow-xl border-8"
          style={{ backgroundColor: frameColor, minHeight: "450px" }} // Increase min-height of the frame
        >
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative w-30 h-32 sm:w-36 sm:h-40 bg-black rounded-md overflow-hidden "
            >
              <img src={photo || "/placeholder.svg"} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />

              {/* Stickers on the Frame (Not on Photo) */}
              {stickers && stickers.length > 0 && (
                <>
                  <img
                    src={`/${stickers[index % stickers.length]}.png`}
                    alt={`Sticker 1`}
                    className="absolute w-10 h-10 sm:w-8 sm:h-8 opacity-90"
                    style={{ top: "2%", left: "-3%", transform: "rotate(-15deg)" }} // Top-left corner of frame
                  />
                  <img
                    src={`/${stickers[(index + 1) % stickers.length]}.png`}
                    alt={`Sticker 2`}
                    className="absolute w-6 h-6 sm:w-8 sm:h-8 opacity-90"
                    style={{ bottom: "5%", right: "-6%", transform: "rotate(15deg)" }} // Bottom-right corner of frame
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <Button onClick={handleDownload} className="bg-orange-800 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 rounded flex items-center">
          Download <Download className="ml-2 h-4 w-4" />
        </Button>

        <Button onClick={handleShare} className="bg-orange-800 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 rounded flex items-center">
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
