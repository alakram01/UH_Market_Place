"use client";
// import { prisma } from "../../../../prisma/prisma";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useState } from "react";
import tutorimage from "@/components/images/Tutor-image.png"
// import Sidebar from "@/components/sideBar";
import ItemCarousel from "@/components/itemCarousel";
import DiscoverList from "@/components/discoverItems";
import SellerCarousel from "@/components/sellerCarousel";
// future imports for the componets made from the tuturhub designs
import Listpannel from "@/components/Listpannel";
import LiveTutoringPage from "@/components/LiveTutoringPage";
import ScrollFadeIn from "@/components/ScrollFadeIn";
import ScrollFadeInNoRepeat from "@/components/ScrollFadeInNoRepeat";
//import LiveTutoringPage2 from "@/components/LiveTutoringPage2";
export default  function TutorHub() {

    const [selectedSection, setSelectedSection] = useState("TutorHub");

  const getSeason = () => {
    const today = dayjs(); // current date
    const mmdd = today.format("MM-DD");

    // Winter: 12-16 to 01-12
    if (
      (mmdd >= "12-16" && mmdd <= "12-31") || 
      (mmdd >= "01-01" && mmdd <= "01-12")
    ) {
      return "Winter";
    }
    // Spring: 01-13 to 05-11
    else if (mmdd >= "01-13" && mmdd <= "05-11") {
      return "Spring";
    }
    // Summer: 05-12 to 08-20
    else if (mmdd >= "05-12" && mmdd <= "08-20") {
      return "Summer";
    }
    // Fall: 08-21 to 12-15
    else {
      return "Fall";
    }
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "liveTutoring":
        return <LiveTutoringPage />;
      case "coursesSupported":
        return <CoursesSupported />;
      case "uhWorkshops":
        return <UhWorkshops />;
      case "resources":
        return <Resources/>;
      case "cooggerTutorHub":
        return <CooggerTutorHub />;
      default:
        return (
            <div className="relative w-fit">
                <ScrollFadeInNoRepeat>
                    <div className="absolute text-black z-20 top-8 left-12 text-2xl p-2">
                        Cougar
                    </div>
                    <div className="absolute text-black z-20 top-12 left-10 text-[60px] p-2 font-bold">
                        Tutor Hub
                    </div>
                </ScrollFadeInNoRepeat>
                <Image
                    src={tutorimage}
                    alt="deafult image"
                    width={1300} 
                    height={300}
                    className="rounded shadow mb-4"
                />
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Listpannel
          onSelect={(section) => setSelectedSection(section)}
          selectedSection={selectedSection}></Listpannel>
        
        <main className="flex-1 p-6">
         
          {renderContent()}
          <div className="flex flex-col md:flex-row items-start md:space-x-6">
           
            <div className="flex-1 mt-4">
              <h1 className="text-2xl font-bold mb-2 text-red-700">
                {getSeason()} 2025 Drop-in Tutoring Schedule
              </h1>
              <p className="text-gray-700 mb-4">
                Find the tutoring sessions for your courses below. Click a category
                to expand and see the specific classes and schedules.
              </p>
            </div>

           
            <div className="mt-4 md:mt-0">
              
              <img
                src="../../../components/images/Tutor-image.png"
                alt=""
                className="rounded shadow"
              />
            </div>
          </div>

          
          <div className="mt-4 space-y-4">
            
            <details className="border rounded">
              <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
                MATH Courses
              </summary>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>MATH 1310: College Algebra - Tue/Thu 2:00PM - 4:00PM</li>
                  <li>MATH 1330: Precalculus - Wed/Fri 10:00AM - 12:00PM</li>
                  <li>MATH 1431: Calculus I - Mon/Wed 1:00PM - 3:00PM</li>
                </ul>
              </div>
            </details>

            
            <details className="border rounded">
              <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
                CHEM Courses
              </summary>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>CHEM 1331: Fundamentals of Chemistry - Tue/Thu 9:00AM - 11:00AM</li>
                  <li>CHEM 1332: Fundamentals of Chemistry II - Mon/Wed 2:00PM - 4:00PM</li>
                </ul>
              </div>
            </details>

            
            <details className="border rounded">
              <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
                PHYS Courses
              </summary>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>PHYS 1301: Intro to Physics - Tue/Thu 1:00PM - 3:00PM</li>
                  <li>PHYS 1302: Intro to Physics II - Mon/Wed 10:00AM - 12:00PM</li>
                </ul>
              </div>
            </details>

            
            <details className="border rounded">
              <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
                UH Workshops
              </summary>
              <div className="p-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>Time Management Tips - Fridays 11:00AM - 12:00PM</li>
                  <li>Effective Study Groups - Mondays 3:00PM - 4:00PM</li>
                  <li>Exam Prep 101 - Wednesdays 5:00PM - 6:00PM</li>
                </ul>
              </div>
            </details>

           
          </div>
        </main>
      </div>
    </div>
  );
}


function LiveTutoring() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Live Tutoring</h2>
        <p>This is where you’d put information or UI for live tutoring.</p>
      </div>
    );
  }
  
  function CoursesSupported() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Courses Supported</h2>
        <p>List of courses, times, etc.</p>
      </div>
    );
  }
  
  function UhWorkshops() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">UH Workshops</h2>
        <p>Workshop schedule or descriptions go here.</p>
      </div>
    );
  }
  
  function Resources() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Resources</h2>
        <p>Links, documents, or any helpful resources for students.</p>
      </div>
    );
  }
  
  function CooggerTutorHub() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Coogger Tutor Hub</h2>
        <p>Any special content related to the Coogger Tutor Hub.</p>
      </div>
    );
  }

  function DefaultScheduleView() {
    return (
      <>
        
        <div className="flex flex-col md:flex-row items-start md:space-x-6">
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2 text-red-700">
              Spring 2025 Drop-in Tutoring Schedule
            </h1>
            <p className="text-gray-700 mb-4">
              Find the tutoring sessions for your courses below. Click a category
              to expand and see the specific classes and schedules.
            </p>
          </div>
  
         
          <div className="mt-4 md:mt-0">
            
            <img
              src="https://via.placeholder.com/300x200"
              alt="Tutoring"
              className="rounded shadow"
            />
          </div>
        </div>
  
        
        <div className="mt-8 space-y-4">
          
          <details className="border rounded">
            <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
              MATH Courses
            </summary>
            <div className="p-4">
              <ul className="list-disc list-inside space-y-1">
                <li>MATH 1310: College Algebra - Tue/Thu 2:00PM - 4:00PM</li>
                <li>MATH 1330: Precalculus - Wed/Fri 10:00AM - 12:00PM</li>
                <li>MATH 1431: Calculus I - Mon/Wed 1:00PM - 3:00PM</li>
              </ul>
            </div>
          </details>
  
         
          <details className="border rounded">
            <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
              CHEM Courses
            </summary>
            <div className="p-4">
              <ul className="list-disc list-inside space-y-1">
                <li>CHEM 1331: Fundamentals of Chemistry - Tue/Thu 9:00AM - 11:00AM</li>
                <li>CHEM 1332: Fundamentals of Chemistry II - Mon/Wed 2:00PM - 4:00PM</li>
              </ul>
            </div>
          </details>
  
          
          <details className="border rounded">
            <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
              PHYS Courses
            </summary>
            <div className="p-4">
              <ul className="list-disc list-inside space-y-1">
                <li>PHYS 1301: Intro to Physics - Tue/Thu 1:00PM - 3:00PM</li>
                <li>PHYS 1302: Intro to Physics II - Mon/Wed 10:00AM - 12:00PM</li>
              </ul>
            </div>
          </details>
  
        
          <details className="border rounded">
            <summary className="cursor-pointer px-4 py-2 bg-gray-200 font-semibold">
              UH Workshops
            </summary>
            <div className="p-4">
              <ul className="list-disc list-inside space-y-1">
                <li>Time Management Tips - Fridays 11:00AM - 12:00PM</li>
                <li>Effective Study Groups - Mondays 3:00PM - 4:00PM</li>
                <li>Exam Prep 101 - Wednesdays 5:00PM - 6:00PM</li>
              </ul>
            </div>
          </details>
  
          
        </div>
      </>
    );
  }