import React from "react";
import Image from "next/image";
import uhLogo from "./images/uh_white_logo.png";
import { Session } from "next-auth";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { prisma } from "../../prisma/prisma";

type props = {
  session: Session | null;
  profilePicUrl?: string | null;
};


const Header = (props: props) => {
  const { session, profilePicUrl } = props;

  return (
    <header
      style={{ backgroundColor: "#C8102E" }}
      className="text-white sticky top-0 w-full z-50"
    >
      <div className="container mx-auto py-4 flex justify-between items-center px-8">
          
        <div className="flex items-center space-x-8 pl-6">
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
          {session ? (
            <a
              href="/api/auth/signout"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-lg"
            >
              Sign Out
            </a>
          ) : (
            <a
              href="/login"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg"
            >
              Sign In
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
          </a>
          {session ? (
            <Link 
            href={'/dashboard'}
            className="self-center"
            >
                <Avatar
                  src={profilePicUrl || "/default-avatar.png"}
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
