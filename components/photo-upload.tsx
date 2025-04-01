"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Plus, Check } from "lucide-react";

interface PhotoUploadProps {
  onComplete: (photos: string[]) => void;
}

export default function PhotoUpload({ onComplete }: PhotoUploadProps) {
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const remainingSlots = 3 - selectedPhotos.length;
      const filesToProcess = newFiles.slice(0, remainingSlots);

      Promise.all(
        filesToProcess.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                resolve(e.target.result as string);
              }
            };
            reader.readAsDataURL(file);
          });
        })
      ).then((newPhotos) => {
        setSelectedPhotos((prev) => [...prev, ...newPhotos].slice(0, 3));
      });
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleContinue = () => {
    if (selectedPhotos.length === 3) {
      onComplete(selectedPhotos);
    } else {
      alert("Please select exactly 3 photos");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl mb-6 font-[prata] text-center text-orange-800">
          Select 3 Photos
        </h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-20 gap-4 mb-6 w-full place-items-center">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-32 h-32 md:w-44 md:h-44 border-2 border-dashed border-orange-800 rounded-lg flex flex-col items-center justify-center relative overflow-hidden"
            >
              {selectedPhotos[index] ? (
                <>
                  <img
                    src={selectedPhotos[index] || "/placeholder.svg"}
                    alt={`Selected photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
                    aria-label="Remove photo"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <div
                  onClick={triggerFileInput}
                  className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200"
                >
                  <Plus size={32} className="text-orange-800 mb-1" />
                  <span className="text-xs sm:text-sm text-orange-800">
                    Add Photo
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          multiple={selectedPhotos.length < 3}
        />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button
            onClick={triggerFileInput}
            className="bg-orange-800 hover:bg-amber-700 text-white font-[prata] text-md px-6 sm:px-8 py-2 rounded flex items-center justify-center w-full sm:w-auto"
            disabled={selectedPhotos.length >= 3}
          >
            Select Photos <Upload className="ml-2 h-5 w-5" />
          </Button>

          <Button
            onClick={handleContinue}
            className="bg-orange-800 hover:bg-amber-700 text-white font-[prata] text-md px-6 sm:px-8 py-2 rounded flex items-center justify-center w-full sm:w-auto"
            disabled={selectedPhotos.length !== 3}
          >
            Continue <Check className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
