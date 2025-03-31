"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CameraCaptureProps {
  onComplete: (photos: string[]) => void;
}

export default function CameraCapture({ onComplete }: CameraCaptureProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Unable to access camera. Please make sure you've granted permission.");
      }
    }

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (photos.length >= 3) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      onComplete(photos);
      return;
    }

    if (cameraReady && photos.length < 3 && countdown === null) {
      setCountdown(3);
    }

    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setShowCurtain(true);
        setTimeout(() => {
          capturePhoto();
          setShowCurtain(false);
          setCountdown(null);
        }, 800);
      }
    }
  }, [cameraReady, photos, countdown, onComplete]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoDataUrl = canvas.toDataURL("image/png");
        setPhotos((prevPhotos) => [...prevPhotos, photoDataUrl]);
      }
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-yellow-100 text-orange-800 px-4 sm:px-6">
      {/* Photo Counter */}
      <h2 className="text-2xl sm:text-3xl font-[prata] mb-4 flex items-center gap-2 text-center">
        <img src="/capture.png" alt="camera" className="w-16 h-16 sm:w-20 sm:h-20" />
        {photos.length < 3 ? `Captures ${photos.length + 1} of 3` : "Processing..."}
      </h2>

      {/* Camera Window */}
      <div className="relative w-full max-w-lg sm:w-[640px] sm:h-[480px] h-[300px] aspect-video bg-black overflow-hidden border-4 border-orange-800 rounded-lg flex items-center justify-center">
  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {/* Countdown Timer */}
        {countdown !== null && (
          <div className="absolute text-5xl sm:text-6xl font-extrabold text-white animate-pulse">
            {countdown}
          </div>
        )}

        {/* Curtain Animation */}
        <AnimatePresence>
          {showCurtain && (
            <motion.img
              src="/curtain.png"
              alt="Curtain"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Photo Previews */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-orange-800 overflow-hidden">
            {photos[index] && (
              <img src={photos[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
