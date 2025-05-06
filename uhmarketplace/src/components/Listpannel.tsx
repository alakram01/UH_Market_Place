// components/Listpannel.tsx
"use client";

type ListpannelProps = {
    onSelect: (section: string) => void;
  };

  export default function Listpannel({ onSelect }: ListpannelProps) {
    return (
      <aside className="hidden md:block w-64 bg-gray-100 p-4">
        <nav>
          <ul className="space-y-4">
            <li
              onClick={() => onSelect("liveTutoring")}
              className="font-semibold text-red-700 cursor-pointer hover:underline"
            >
              Live Tutoring
            </li>
            <li
              onClick={() => onSelect("coursesSupported")}
              className="font-semibold text-gray-700 cursor-pointer hover:underline"
            >
              Courses Supported
            </li>
            <li
              onClick={() => onSelect("uhWorkshops")}
              className="font-semibold text-gray-700 cursor-pointer hover:underline"
            >
              UH Workshops
            </li>
            <li
              onClick={() => onSelect("resources")}
              className="font-semibold text-gray-700 cursor-pointer hover:underline"
            >
              Resources
            </li>
            <li
              onClick={() => onSelect("TutorHub")}
              className="font-semibold text-gray-700 cursor-pointer hover:underline"
            >
              Coog Tutor Hub
            </li>
          </ul>
        </nav>
      </aside>
    );
  }