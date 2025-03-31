"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PhotoBoothStart from "@/components/photo-booth-start"
import CameraCapture from "@/components/camera-capture"
import AddNote from "@/components/add-note"
import CustomizePhotostrip from "@/components/customize-photostrip"
import FinalPhotostrip from "@/components/final-photostrip"

export default function PhotoBooth() {
  const [step, setStep] = useState(1)
  const [photos, setPhotos] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("#FFF9D6") // Default light yellow
  const [frameColor, setFrameColor] = useState("#FFB6C1") // Default light pink
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

  const router = useRouter()

  const handlePhotosComplete = (capturedPhotos: string[]) => {
    setPhotos(capturedPhotos)
    setStep(3)
  }

  const handleNoteSubmit = (submittedNote: string) => {
    setNote(submittedNote)
    setStep(4)
  }

  const handleCustomizationComplete = (bgColor: string, frColor: string, sticker: string | null) => {
    setBackgroundColor(bgColor);
    setFrameColor(frColor);
    setSelectedStickers(sticker ? [sticker] : []); // Convert single sticker to array
    setStep(5);
  };
  
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FFF9D6" }}>
      {step === 1 && <PhotoBoothStart onStart={() => setStep(2)} />}
      {step === 2 && <CameraCapture onComplete={handlePhotosComplete} />}
      {step === 3 && <AddNote onSubmit={handleNoteSubmit} />}
      {step === 4 && <CustomizePhotostrip onComplete={handleCustomizationComplete} />}
      {step === 5 && (
        <FinalPhotostrip
          photos={photos}
          note={note}
          backgroundColor={backgroundColor}
          frameColor={frameColor}
          stickers={selectedStickers}
        />
      )}
    </main>
  )
}

