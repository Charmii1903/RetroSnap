import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface AddNoteProps {
  onSubmit: (note: string) => void;
}

export default function AddNote({ onSubmit }: AddNoteProps) {
  const [note, setNote] = useState("");
  const [showAbout, setShowAbout] = useState(false);

  const handleSubmit = () => {
    onSubmit(note);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-4">
      {/* About Button */}
      <motion.div
        className="absolute top-4 right-4 sm:right-6"
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 100 }}
      >
        <Button
          onClick={() => setShowAbout(true)}
          className="bg-orange-900 text-white px-6 py-2 sm:px-8 rounded transform rotate-6 hover:rotate-0 hover:bg-amber-700 transition-all"
        >
          About
        </Button>
      </motion.div>

      {/* Note Input Section */}
      <div className="flex flex-col items-center max-w-md w-full px-4">
        <h2 className="text-2xl mb-4 font-serif text-orange-800 flex items-center gap-2 text-center">
          Add a note
          <img src="/note.png" alt="photo" className="w-12 h-12 sm:w-16 sm:h-16" />
        </h2>

        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
          className="w-full h-40 sm:h-60 bg-orange-200 border-orange-800 resize-none mb-6 
                     placeholder:text-orange-600 placeholder:italic 
                     text-orange-900 font-[Prata] text-lg"
        />

        <Button
          onClick={handleSubmit}
          className="bg-orange-800 hover:bg-amber-700 text-white font-[prata] text-lg px-8 py-3 sm:px-10 sm:py-4 rounded"
        >
          Continue
        </Button>
      </div>

      {/* About Popup */}
      {showAbout && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg max-w-sm sm:max-w-md text-center">
            <h2 className="text-2xl font-bold text-gray-700 font-[prata]">About Us</h2>
            <p className="mt-2 text-gray-700 font-[prata] text-sm sm:text-base">
              Welcome to RetroSnap Photobooth – your gateway to a fun and unforgettable digital photobooth experience!
              Capture memories, strike a pose, and enjoy the magic of instant snapshots. Designed with love by Charmi,
              RetroSnap is all about bringing joy, creativity, and a touch of nostalgia to every click. So go ahead,
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
