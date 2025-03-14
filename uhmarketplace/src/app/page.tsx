/* eslint-disable @typescript-eslint/no-unused-vars */
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import UserCard from "../components/UserCard";
import ImageCarousel from "../components/Slider";
import FeatureBox from "@/components/ui/FeatureBox";
import Footer from "@/components/footer";
import AboutSquare from "@/components/AboutSquare";
import LandingBanner from "@/components/LandingBanner";

export default async function Home() {
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

  return (
    <div>
      <LandingBanner></LandingBanner>
      <div className="flex-col sm:flex-row flex justify-around py-16 bg-white text-gray-700 z-1 px-8 gap-4">
        <FeatureBox
          imageSrc="landing-images/box-icon.png"
          altText="Box Icon"
          description="Find products around campus from classmates"
        />
        <FeatureBox
          imageSrc="landing-images/chat-icon.png"
          altText="Chat Icon"
          description="Chat with other students at the University of Houston"
        />
        <FeatureBox
          imageSrc="landing-images/services-cion.png"
          altText="Tutoring Icon"
          description="Struggling with exams? Find tutors, and other services"
        />
        <FeatureBox
          imageSrc="landing-images/money-icon.png"
          altText="Dollar Icon"
          description="Sell your products and services to get an extra buck"
        />
      </div>

      <main className="min-h-full flex items-center justify-center bg-gray-100 py-10">
        <ImageCarousel images={images} captions = {captions} />
      </main>

      <div className="flex gap-6 my-8 flex-col justify-center items-center">
      <AboutSquare
      title="A STUDENT'S MARKETPLACE"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="(Explore the marketplace website section: picture of setting up an item for others to sell)"
       />
      </div>
      <hr className="mx-10"/>

      <AboutSquare
      title="NEED HELP WITH YOUR CLASSES?"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="(Stuck on hw or worried about exams? Don't worry! We've organized every TA & Tutor's time availability
      and meet up with them!: Picture of a tutor/TA helping a student)"
        />

      <hr className="mx-10"/>

      <AboutSquare
      title="JOIN A CLUB TODAY"
      imageSrc="landing-images/UH-Photo-4.jpg"
      imageAlt="UH Community Photo"
      content="(Meet up with other students on campus by joining a club: picture of the different club's logos)"
       />

      <Footer></Footer>

    </div>
  );
}
