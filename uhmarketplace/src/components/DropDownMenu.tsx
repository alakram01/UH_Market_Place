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
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-4 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        <Image src="/landing-images/hamburger-menu.png" width={40} height={40} alt="Menu" />
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
