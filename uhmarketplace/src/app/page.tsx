/* eslint-disable @typescript-eslint/no-unused-vars */
import AnimatedFeatureBoxes from "../components/AnimatedFeatureBoxes";
import { motion } from "framer-motion";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import ImageCarousel from "../components/Slider";
import ImageCarousel2 from "../components/Slider2";
import FeatureBox from "@/components/ui/FeatureBox";
import Footer from "@/components/footer";
import AboutSquare from "@/components/AboutSquare";
import LandingBanner from "@/components/LandingBanner";

export default async function Home() {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3, // Delay between each child
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const session = await getServerSession(options);
  console.log(session);
  const images = [
    "/landing-images/UH-Image-1.jpg",
    "/landing-images/UH-Image-2.jpg",
    "/landing-images/UH-Image-3.jpg",
  ];

  const captions = [
    "Meet up with fellow students",
    "Find a community by joining clubs",
    "Explore campus",
  ];

  const captions2 = [
    "1) Insert a photo of a product/service you would like to sell",
    "2) Insert a name and price for you product/service",
    "3) Post your listing into the marketplace",  
  ]
  
  return (
    <div>
      <LandingBanner></LandingBanner>
      <AnimatedFeatureBoxes></AnimatedFeatureBoxes>

      <main className="min-h-full flex items-center justify-center bg-gray-100 py-10">
        <ImageCarousel images={images} captions = {captions} />
      </main>

      {/* Marketplace Section */}
      <div id="marketplace" className="flex flex-col items-center p-4 mb-10 mt-10">
        {/* <div data-aos="fade-down" className="grid">
          <p className="text-3xl font-bold mb-4">
          A STUDENT'S MARKETPLACE</p>
        </div> */}
        <ScrollFadeIn>
            <div className="grid">
              <p className="text-4xl font-bold mb-4">
                A STUDENT'S MARKETPLACE</p>
            </div>
        </ScrollFadeIn>
        <div className="grid grid-cols-3 gap-4 w-full max-w-6xl text-center text-lg">
          <div className="col-span-1 flex flex-col gap-2">
            <hr className="z-20 text-center border-gray-400 border-t-2"/>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5 p-4 rounded flex items-center justify-center">
                <img
                  src="landing-images/og-shopping-cart.png"
                  className="w-[118px] h-[128px] object-contain mx-auto drop-shadow-md"
                />
              </div>
              <div className="py-4 col-span-7 p-4 rounded">
                <ScrollFadeIn>
                  <h2 className="font-bold mb-[5px]">SET UP to SELL!</h2>
                  <p>User-friendly marketplace website to sell products to other students.</p>
                </ScrollFadeIn>
              </div>
            </div>
            <hr className="z-20 text-center border-gray-400 border-t-2 border-gray-300"/>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-5 p-4 rounded flex items-center justify-center">
                <img
                  src="landing-images/money-icon.png"
                  className="w-[96px] h-[96px]"
                />
              </div>
              <div className="py-4 col-span-7 p-4 rounded">
                <ScrollFadeIn>
                  <h2 className="font-bold mb-[5px] text-nowrap">The PLACE to BUY</h2>
                  <p>Shop and exchange products & services with fellow students!</p>
                </ScrollFadeIn>
              </div>
            </div>
            <hr className="mt-5 z-20 text-center border-gray-400 border-t-2"/>
          </div>
          <div className="ml-2 col-span-2 flex justify-center items-center">
          <ImageCarousel2 images={images} captions = {captions2} />
          </div>
        </div>
      </div>

      {/* Tutoring Section */}
      <div id="tutoring" className="flex flex-col items-center p-4 mb-10">
        <div className="flex">
          <ScrollFadeIn>
            <div className="grid">
              <p className="text-4xl font-bold m-4">
              NEED HELP WITH YOUR CLASSES?</p>
            </div>
          </ScrollFadeIn>
        </div>
        <div className="grid gap-4 w-full max-w-6xl text-lg">
          <ScrollFadeIn>
            <div className="bg-white-200 flex justify-center items-center max-w-6xl py-0">
              Stuck on homework or worried about exams? Don't worry! We've organized every TA & Tutor's time availability
              for you to meet up with them!
            </div>
          </ScrollFadeIn>
          <div className="grid grid-cols-3 gap-4 w-full">
              <div className="col-span-2 flex justify-center items-center">
                <img src="landing-images/tutoring-in-library.jpg"></img>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-2">
                  <ScrollFadeIn>
                    <div className="bg-white-200 p-4 rounded text-center outline outline-gray-400 outline-2">
                      <div className="h-32 flex items-center justify-center mb-2">
                        <img
                          src="landing-images/business-handshake-on-transparent-background-free-png.webp"
                          style={{ width: "6.8rem", height: "5.5rem" }}
                          className="object-contain"
                        />
                      </div>
                      <h2 className="font-bold mb-4">MEET UP WITH TUTORS</h2>
                      <p className="mb-10">
                        Discover countless tutors to help you succeed in your classes
                      </p>
                    </div>
                  </ScrollFadeIn>
                  <ScrollFadeIn>
                    <div className="bg-white-200 p-4 rounded text-center outline outline-gray-400 outline-2">
                      <div className="h-32 flex items-center justify-center mb-2">
                        <img className="w-20 h-20" src="landing-images\wall-clock-silhouette-image.png" />
                      </div>
                      <h2 className="font-bold mb-4">SET A TIME AND PLACE</h2>
                      <p className="mb-10">
                        We've easily organized the time and place of your choosing!
                      </p>
                    </div>
                  </ScrollFadeIn>
                </div>
                <div className="row-span-1">
                  <button className="mt-3 w-full text-white py-3 font-bold bg-red-600 hover:bg-red-500 rounded-lg">
                    Schedule Now!
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Join a Club Section */}
      <div id="clubs" className="flex flex-col items-center p-4 mb-10">
        <ScrollFadeIn>
            <div>
              <p className="text-4xl font-bold mb-4">
                JOIN A CLUB TODAY!
              </p>
            </div>
        </ScrollFadeIn>
        <div className="grid grid-cols-4 gap-4 max-w-6xl text-center">
          <div className="flex flex-col">
            <div className="bg-white-200 flex justify-center items-center p-14 text-lg">
              <ScrollFadeIn>
                With over 500 registered student organizations, you're guaranteed to find a club of your interest
                and meet up with other like-minded students!
              </ScrollFadeIn>
            </div>
            <a
              href="https://uh.edu/nsm/students/student-organizations/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[10px] w-full text-white py-3 font-bold bg-red-600 hover:bg-red-500 text-center block rounded-lg"
            >
              Find your club!
            </a>
          </div>
          <div className="flex col-span-3 justify-center items-center max-w-5xl">
            <img src="landing-images/student-clubs.png" />
          </div>
        </div>
      </div>


      <Footer></Footer>

    </div>
  );
}
