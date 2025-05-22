import React from "react";
import Image from "next/image";
import uhLogo from "./images/uh_white_logo.png";
import { Session } from "next-auth";
import Link from "next/link";
import { Avatar } from "@nextui-org/react"; // This is the problem
import { prisma } from "../../prisma/prisma";

type props = {
  session: Session | null;
};

const Header = async (props: props) => {
  let profileImage;
  if(props.session) {
    profileImage = await prisma.user.findUnique({
        where: {
            email: props.session?.user?.email as string
        },
        // Only pulls the profilePicUrl from the user
        select: {
            profilePicUrl: true
        }
      })
  }


  return (
    <header
      style={{ backgroundColor: "#C8102E" }}
      className="text-white sticky top-0 w-full z-50"
    >
      <div className="container mx-auto py-4 flex justify-between items-center px-8">
        <div>
          <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            <img
              src="landing-images/hamburger-menu.png"
              className="w-[40px] h-[40px]"
            />
          </button>
          {/* <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div className="py-1" role="none">
              
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
              <form method="POST" action="#" role="none">
                <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
              </form>
            </div>
          </div> */}
        </div>  
        <div className="flex items-center space-x-8 pl-84">
          <Link href={'/'}>
              <Image
              src={uhLogo}
              alt="Logo"
              width={70}
              height={70}
              className="h-14 w-auto md:h-14 md:block"
              />
          </Link>


          <div className="flex flex-col items-start justify-center">
            <h1 className="text-center text-xl md:text-3xl sm:text-3xl lg:text-[2.35rem] font-bold drop-shadow-xl">
              COOGBAY
            </h1>
            <h2 className="text-center text-sm md:text-lg lg:text-xl drop-shadow-xl">
              FOR COUGARS, BY COUGARS
            </h2>
          </div>
        </div>
        

        <nav className="flex gap-2 pr-4">
          {/* {props.session ? (
            <a
              href="/api/auth/signout"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-lg"
            >
              Sign Out
            </a>
          ) : (
            <a
              href="/signup"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg"
            >
              Sign Up
            </a>
          )}
          <a href="/studycheck"
          className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg">
            Study Check-Ins
          </a>
          <a href="/tutorhub"
          className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg">
            Tutoring
          </a>
          <a
            href="/marketplace"
            className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg"
          >
            Marketplace
          </a> */}
          {props.session ? (
            <Link 
            href={'/dashboard'}
            className="self-center"
            >
                <Avatar
                  src={profileImage?.profilePicUrl || "/default-avatar.png"}
                  alt="User Avatar"
                />
            </Link>
          ): (
            null
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
