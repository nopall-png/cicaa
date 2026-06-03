'use client';

import { useState, useEffect } from 'react';
import confetti from "canvas-confetti";

// Custom SVG: Envelope 
const EnvelopeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-sm">
    <rect x="10" y="25" width="80" height="55" rx="6" fill="#FDF2F8" />
    <path d="M10 25L50 55L90 25" stroke="#FBCFE8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 80L40 55M90 80L60 55" stroke="#FBCFE8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M50 48C50 48 38 32 25 40C12 48 28 68 50 82C72 68 88 48 75 40C62 32 50 48 50 48Z" fill="#F43F5E" />
  </svg>
);

// Custom SVG: Cute Heart Character
const HeartCharacter = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-md hover:scale-105 transition-transform duration-300">
    <path d="M50 85C50 85 15 55 15 30C15 15 30 5 50 20C70 5 85 15 85 30C85 55 50 85 50 85Z" fill="#F43F5E" />
    <circle cx="35" cy="40" r="4" fill="#4C1D95" />
    <circle cx="65" cy="40" r="4" fill="#4C1D95" />
    <ellipse cx="22" cy="45" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
    <ellipse cx="78" cy="45" rx="5" ry="3" fill="#FDA4AF" opacity="0.6" />
    <path d="M45 50 Q50 55 55 50" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M12 45 Q5 50 8 60" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M88 45 Q95 50 92 60" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

const launchConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 90,
    origin: { y: 0.6 },
  });
};

export default function ForgiveMeProject() {
  const [step, setStep] = useState(1);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Array kata-kata lucu yang akan diputar (Page 1)
  // Aku tambahkan "No" di urutan pertama biar awalnya tombol bertuliskan No
  const brokenPhrases = [
    "No",
    "that ones broken",
    "sorry, connection error",
    "button is currently tired",
    "404: 'No' not found",
    "try the pink one 👉",
    "system override: must click yes",
    "masih aja dipencet 🙄",
    "lagi maintenance...",
    "please call developer",
    "error 0x0000: you are too cute"
  ];

  // State untuk melacak index kata-kata saat ini (Page 1)
  const [brokenIndex, setBrokenIndex] = useState(0);

  // State untuk melacak perpindahan koordinat tombol "No" (Page 2)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Logic memutar kata-kata (Page 1)
  const handleBrokenClick = () => {
    setBrokenIndex((prevIndex) => (prevIndex + 1) % brokenPhrases.length);
  };

  // Logic tombol "No" kabur (Page 2)
  const handleNoHover = () => {
    // Menghasilkan posisi acak yang lumayan jauh biar susah ditangkap
    const randomX = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 150) + 50);
    const randomY = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 150) + 50);
    setNoPosition({ x: randomX, y: randomY });
  };

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, [step, isLetterOpen]);

  const totalSteps = 3;

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center p-6 font-sans text-gray-800 relative overflow-hidden">
      
      {/* PAGE INDICATOR */}
      <div className="absolute top-8 left-0 right-0 flex justify-center gap-3 z-50">
        {[...Array(totalSteps)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ease-out ${
              step >= i + 1 ? 'bg-pink-500 scale-125' : 'bg-pink-100'
            }`}
          />
        ))}
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div 
        className={`w-full max-w-lg text-center transition-all duration-700 ease-out transform ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        
        {/* PAGE 1: Permintaan Maaf Ketiduran */}
        {step === 1 && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-center relative">
                <EnvelopeIcon />
                <span className="absolute -right-2 top-0 text-yellow-400 text-xl animate-pulse">✨</span>
            </div>

            <div className="space-y-3 px-2">
              <h1 className="text-3xl md:text-5xl font-serif text-pink-600 leading-tight">
                I'm so sorry, <span className="font-bold italic"> aku keboo </span> maafin aku ya sayang?
              </h1>
              <p className="text-gray-500 text-xs md:text-base italic tracking-wide">
                (i didn't mean to make you wait, i love you sayang.)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
              <button
                onClick={() => {
                  setStep(2);
                  launchConfetti();
                }}
                className="w-full sm:w-auto px-12 py-3.5 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 active:scale-95 transition-all shadow-lg hover:shadow-pink-200"
              >
                Yes, I forgive you
              </button>
              <button
                onClick={handleBrokenClick}
                className="w-full sm:w-auto px-6 py-3 bg-pink-50 text-pink-500 font-medium rounded-full hover:bg-pink-100 transition-all text-sm"
              >
                {brokenPhrases[brokenIndex]}
              </button>
            </div>

            <div className="flex flex-col items-center pt-8 md:pt-10 space-y-2 md:space-y-3">
                <HeartCharacter />
                <p className="text-gray-500 text-[10px] md:text-sm italic">
                  (here is me, emotionally available and extremely sorry.)
                </p>
            </div>
          </div>
        )}

        {/* PAGE 2: Dinner Date */}
        {step === 2 && (
          <div className="space-y-6 md:space-y-8">
            <div className="flex justify-center">
               <HeartCharacter />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-pink-600 leading-snug px-4">
                 Thank you, my love! ❤️ <br />
                 <span className="text-2xl md:text-3xl text-gray-800 mt-4 block">
                    Are you ready to grab dinner together Friday at 7 PM after you get off work?
                </span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 px-8 sm:px-0 relative">
              <button
                onClick={() => {
                  launchConfetti();
                  setStep(3);
                }}
                className="w-full sm:w-auto px-12 py-3.5 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 active:scale-95 transition-all shadow-lg hover:shadow-pink-200 z-10"
              >
                Yes
              </button>
              
              {/* TOMBOL NO YANG KABUR */}
              <button
                onMouseEnter={handleNoHover} // Kabur pas disorot mouse (Laptop)
                onClick={handleNoHover}      // Kabur pas diklik/ditap (HP)
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                }}
                className="w-full sm:w-auto px-12 py-3.5 bg-gray-100 text-gray-500 font-semibold rounded-full shadow-sm transition-transform duration-300 ease-out z-20"
              >
                No
              </button>

            </div>
          </div>
        )}

        {/* PAGE 3: The Letter */}
        {step === 3 && (
          <div className="flex flex-col items-center">
            {!isLetterOpen ? (
              <div 
                onClick={() => setIsLetterOpen(true)}
                className="cursor-pointer group flex flex-col items-center gap-4 md:gap-6 mt-10"
              >
                <div className="animate-bounce">
                  <EnvelopeIcon />
                </div>
                <p className="text-pink-500 font-medium tracking-wide group-hover:text-pink-600 transition-colors">
                  Click to open the letter
                </p>
              </div>
            ) : (
              <div className="text-left bg-white p-6 md:p-10 rounded-3xl border border-pink-100 shadow-2xl shadow-pink-100 w-full max-w-sm md:max-w-lg mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-pink-50 rounded-full opacity-50 blur-xl"></div>
                
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-pink-600 mb-4 md:mb-6 relative z-10">To my dearest,</h2>
                <div className="space-y-3 md:space-y-4 text-gray-600 leading-relaxed relative z-10 text-base md:text-lg">
                  <p>
                    haii sayang, aku cuma mau bilang makasih banget udah maafin aku. aku tau aku udahh ketiduran kaya orang matii suri berjam-jam padahal kita bisa call an lamaa banget tapi aku bobo terus dari kemarin.
                  </p>
                  <p>
                    maaf yaa, buat 2 hari berturut-turut aku udahh ninggalin kamu demi bobo. aku udah masang alarm tapi tetep ga kebangun sayangggg, so sowrryyy aku besok nyalain semua alarmm kuuu rawrrr.
                  </p>
                  <p>
                    See you this Friday! jaga kesehatan kamu yaa sayang biar kita bisa mam. I love you! 💕
                  </p>
                </div>
                <div className="text-center mt-8 md:mt-10 relative z-10">
                  <button 
                    onClick={() => setIsLetterOpen(false)}
                    className="text-sm font-medium text-pink-500 hover:text-white bg-pink-50 hover:bg-pink-500 px-6 py-2.5 rounded-full transition-all duration-300 w-full sm:w-auto"
                  >
                    Close letter
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-[10px] md:text-[11px] text-gray-300 font-medium tracking-widest uppercase">
          love to my dearest from your very sleepy boyfriend &lt;3
      </div>
    </div>
  );
}