import React from "react";
import ScrollFadeIn from "@/components/ScrollFadeIn";

const LandingBanner = () => {
  return (
    <div className="bg-cover bg-center py-16 text-white relative h-[30rem]">
      {/* Background Image */}
      <img
        src="landing-images/UH-DINE-SELL.jpg"
        alt="UH Dine and Sell"
        className="absolute top-0 left-0 right-0 bottom-0 opacity-80 -z-1 object-cover h-full w-full"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

        {/* Title */}
        <h2 className="font-league text-5xl sm:text-[70px] font-bold absolute top-36 right-2 left-2 text-center drop-shadow-[0_0_4px_black]">
          <ScrollFadeIn>
            MARKETPLACE & TUTORING CENTER
          </ScrollFadeIn>
        </h2>

        {/* Horizontal Line */}
        <hr className="absolute top-56 right-20 left-20 text-center" />

        {/* Description */}

          <div className="text-md sm:text-xl mt-2 absolute top-56 right-2 left-2 text-center font-semibold drop-shadow-[0_0_2px_black]">
            <ScrollFadeIn>
              Here at CoogBay, you can sell, purchase, exchange products,
              and find help by connecting with tutors!
            </ScrollFadeIn>
          </div>

    </div>
  );
};

export default LandingBanner;