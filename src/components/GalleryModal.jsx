import React, { useState } from "react";
import { X, ZoomIn, Heart, Share2 } from "lucide-react";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "HackBU 2026 Midnight Hacking Floor",
    caption: "Over 120 teams pushing code at 3:15 AM in Bennett Sports Arena.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    tag: "Hackathon",
  },
  {
    id: 2,
    title: "Autonomous Rover & Embedded Systems Demo",
    caption: "Hardware Pod testing lidar navigation in Academic Block C.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80",
    tag: "Robotics",
  },
  {
    id: 3,
    title: "Agentic AI Masterclass Live Demo",
    caption: "Deep dive into LangGraph and local vector embeddings.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&q=80",
    tag: "AI/ML",
  },
  {
    id: 4,
    title: "Silicon Circuitry & Firmware Workshop",
    caption: "Hands-on ESP32 and micro-controller assembly in Lab 201.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    tag: "Hardware",
  },
  {
    id: 5,
    title: "NullSector Cyber CTF Defense Room",
    caption: "Red teams and Blue teams clashing in real-time network exploits.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80",
    tag: "Cybersecurity",
  },
  {
    id: 6,
    title: "CodeRush Bennett Championship Podium",
    caption: "Bennett University leaderboard champions receiving CSI mementos.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    tag: "Community",
  },
  {
    id: 7,
    title: "Collaborative Open Source Sprint",
    caption: "Students reviewing pull requests and merging documentation.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    tag: "Open Source",
  },
  {
    id: 8,
    title: "High-Density Workstation Labs",
    caption: "Dual monitor rigs dialed in for algorithm optimization.",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1000&q=80",
    tag: "Campus",
  },
];

export default function GalleryModal({ isOpen, onClose }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-soil/85 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-cream text-soil shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-soil/15 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-soil/10 px-6 sm:px-8 py-5 bg-white/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blush"></span>
              <p className="text-xs font-mono uppercase tracking-wider text-soil/60">
                Bennett Visual Archive
              </p>
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-soil">
              Captured Moments & Milestones
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-soil/60 hover:bg-soil/10 hover:text-soil transition-colors"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-soil shadow-sm border border-soil/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-soil/90 via-soil/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-soil/70 backdrop-blur-md px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-cream border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-cream">
                  <h4 className="font-display text-sm font-bold uppercase tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-[0.72rem] text-cream/70 line-clamp-2 font-sans">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Preview */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-[fadeIn_0.15s_ease-out]"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-soil text-cream border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black transition-colors"
              >
                <X size={20} />
              </button>
              <img
                src={selectedPhoto.img}
                alt={selectedPhoto.title}
                className="max-h-[70vh] w-full object-contain bg-black"
              />
              <div className="p-6 bg-soil">
                <span className="inline-block rounded-full bg-blush px-3 py-0.5 text-xs font-mono font-semibold text-soil uppercase mb-2">
                  {selectedPhoto.tag}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-cream">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-2 text-sm text-cream/75 leading-relaxed font-sans">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
