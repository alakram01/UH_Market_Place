"use client"; // <- very important for any useState or interactive hooks

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DropDownMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border border-transparent inline-flex px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-lg"
      >
        Explore
        <img src="/landing-images/down-chevron.png"
             className="w-[32px] h-[16px] m-2"></img>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute left-0 z-10 mt-2 w-[226px] origin-top-right rounded-md bg-red-700 shadow-lg ring-1 ring-black/5">
          <div className="py-1 lg:text-2xl text-lg">
            <Link href="/marketplace" className="block px-6 py-3 text-white hover:underline">Marketplace</Link>
            <Link href="/tutorhub" className="block px-6 py-3 text-white hover:underline">Tutoring</Link>
            <Link href="/studycheck" className="block px-6 py-3 text-white hover:underline">Study Check-Ins</Link>
          </div>
        </div>
      )}
    </div>
  );
}
