"use client";

import React, { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[]; // Array of image URLs
  captions: string[]; // Array of captions for each image
}

const ImageCarousel2: React.FC<ImageCarouselProps> = ({ images, captions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    if (animating) return; // Prevent triggering during animation
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setAnimating(false);
    }, 600); // Animation duration matches the CSS transition
  };

  const prevSlide = () => {
    if (animating) return; // Prevent triggering during animation
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setAnimating(false);
    }, 600); // Animation duration matches the CSS transition
  };

  // Automatically slide every 5 seconds
  useEffect(() => {
    if(paused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // 5 seconds interval

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [currentIndex, paused]);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden border z-500">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full h-[500px] relative"> {/* Increased height */}
            {/* Image */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover border shadow-lg" // Adjusted height
            />
            {/* Caption */}
            {index === currentIndex && (
              <div className="absolute top-16 left-4 bg-white px-4 py-2 rounded-md shadow-md">
                <p className="text-black text-md font-medium">{captions[index]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Creating Listing */}
      <div className="absolute text-xl font-semibold px-4 py-3 bg-white shadow-md top-0">
        <p>To Create a Listing:</p>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute bottom-3 left-[320px] bg-white/80 shadow-md hover:bg-white/95"
        onClick={prevSlide}
        disabled={animating} // Disable button while animating
      >
        ◀
      </button>
      {/* Pause / Play Toggle */}
      <div className="flex justify-center space-x-2 z-1000">
        {paused ? (
          <button
            className="text-3xl bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            onClick={() => setPaused(false)}
          >
            ▶
          </button>
        ) : (
          <button
            className="text-3xl bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
            onClick={() => setPaused(true)}
          >
            ⏸
          </button>
        )}
      </div>
      <button
        className="absolute bottom-3 left-[415px] bg-white/80 shadow-md hover:bg-white/9"
        onClick={nextSlide}
        disabled={animating} // Disable button while animating
      >
        ▶
      </button>

      {/* Indicators */}
      <div className="absolute justify-center bottom-4 right-4 flex space-x-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
            disabled={animating} // Disable indicators while animating
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel2;
