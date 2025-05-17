// components/Listpannel.tsx
"use client";

type ListpannelProps = {
  onSelect: (section: string) => void;
  selectedSection: string;
};

export default function Listpannel({ onSelect, selectedSection }: ListpannelProps) {
  return (
    <aside className="hidden md:block w-64 bg-gray-100 p-4">
      <nav>
        <ul className="space-y-4">
          {[
            { key: "liveTutoring", label: "Live Tutoring" },
            { key: "coursesSupported", label: "Courses Supported" },
            { key: "uhWorkshops", label: "UH Workshops" },
            { key: "resources", label: "Resources" },
            { key: "TutorHub", label: "Coog Tutor Hub" },
          ].map(({ key, label }) => (
            <li
              key={key}
              onClick={() => onSelect(key)}
              className={`font-semibold cursor-pointer hover:underline ${
                selectedSection === key ? "text-red-700" : "text-gray-700"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}