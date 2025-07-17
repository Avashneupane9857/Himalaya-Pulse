import React, { useState } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
} from "../assets";

// Sample images - replace with your actual image URLs
const sampleImages = [
  {
    id: 1,
    src: gallery2,
    alt: "Mountain landscape",
    isVideo: false,
  },
  {
    id: 2,
    src: gallery1,
    alt: "Airplane view",
    isVideo: false,
  },
  {
    id: 3,
    src: gallery3,
    alt: "Lake with boats",
    isVideo: false,
  },
  {
    id: 4,
    src: gallery4,
    alt: "Camera equipment",
    isVideo: true,
  },
  {
    id: 5,
    src: gallery5,
    alt: "Mountain peak",
    isVideo: false,
  },
  {
    id: 6,
    src: gallery6,
    alt: "Mountain peak",
    isVideo: false,
  },
  {
    id: 7,
    src: gallery7,
    alt: "Mountain peak",
    isVideo: false,
  },
];

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  isVideo: boolean;
}

interface ImageGalleryProps {
  images?: ImageItem[];
  className?: string;
}

const Gallery: React.FC<ImageGalleryProps> = ({
  images = sampleImages,
  className = "",
}) => {
  const [stackedIndex, setStackedIndex] = useState(0);

  const navigateStackedCards = (direction: number) => {
    setStackedIndex((prevIndex) => {
      const newIndex = (prevIndex + direction + images.length) % images.length;
      return newIndex;
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Navbar isHome={false} />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Stacked Cards Gallery */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full h-96 flex items-center justify-center">
                {images.map((image, index) => {
                  // Calculate position relative to current stacked index
                  const relativeIndex =
                    (index - stackedIndex + images.length) % images.length;
                  const positions = [
                    { x: -60, y: -30, scale: 0.6, rotation: -20, zIndex: 1 },
                    { x: -30, y: -15, scale: 0.8, rotation: -10, zIndex: 2 },
                    { x: 0, y: 0, scale: 1, rotation: 0, zIndex: 5 },
                    { x: 30, y: 15, scale: 0.8, rotation: 10, zIndex: 2 },
                    { x: 60, y: 30, scale: 0.6, rotation: 20, zIndex: 1 },
                  ];

                  const position = positions[relativeIndex] || positions[2];

                  return (
                    <div
                      key={image.id}
                      className="absolute transition-all duration-700 ease-out cursor-pointer hover:scale-105 hover:z-50 hover:shadow-2xl"
                      style={{
                        transform: `translate(${position.x}%, ${position.y}%) scale(${position.scale}) rotate(${position.rotation}deg)`,
                        zIndex: position.zIndex,
                      }}
                      onClick={() => window.open(image.src, "_blank")}
                    >
                      <div className="relative w-80 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white backdrop-blur-sm">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />

                        {/* Video Play Button */}
                        {image.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                              <Play className="w-8 h-8 text-gray-800 ml-1" />
                            </div>
                          </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <p className="text-sm font-medium truncate">
                              {image.alt}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right side - Gallery Info and Navigation */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-8">
              <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                  Gallery
                </h1>
              </div>

              {/* Image Counter */}
              <div className="flex items-center space-x-4 text-gray-500">
                <span className="text-sm">
                  {stackedIndex + 1} / {images.length}
                </span>
                <div className="flex space-x-1">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === stackedIndex ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Manual Navigation Controls */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <button
                  onClick={() => navigateStackedCards(-1)}
                  className="group w-12 h-12 bg-white hover:bg-green-600 rounded-full flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => navigateStackedCards(1)}
                  className="group w-12 h-12 bg-white hover:bg-green-600 rounded-full flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200"
                >
                  <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Auto-play toggle */}
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span>Click any image to view in full size</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
