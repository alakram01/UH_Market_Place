'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type CheckInRecord = {
  id: number;
  date: string;
  question1: string; answer1: string;
  question2: string; answer2: string;
  question3: string; answer3: string;
  personalNote: string;
  sentimentLabel?: string;
  sentimentScore?: number;
  productRec?: string;
};

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/checkinhistory')
        .then((res) => res.json())
        .then((data) => setRecords(data))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]" />
      </div>
    );
  }
  if (!session)
    return (
      <button
        onClick={() => signIn()}
        className="px-6 py-3 bg-[#C8102E] text-white rounded-lg shadow"
      >
        Sign in to view your history
      </button>
    );

  const scoreColor = (score: number) => {
    if (score <= 3) return 'text-red-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Map mood labels to emojis
  const moodEmoji = (mood: string | undefined) => {
    switch (mood?.toLowerCase()) {
      case 'happy':   return '😊';
      case 'sad':     return '😢';
      case 'neutral': return '😐';
      case 'positive': return '😐';
      case 'angry':   return '😠';
      case 'excited': return '🤩';
      case 'anxious': return '😟';
      case 'frustrated': return '😤';
      default:        return '❓';
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4">
      <Link href="/checkinanalytics">
          <button className="px-4 py-2 border-2 border-[#C8102E] bg-white text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition-shadow shadow-sm">
            Analytics
          </button>
        </Link>
        <Link href="/chatpage">
          <button className="px-4 py-2 border-2 border-[#C8102E] bg-white text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition-shadow shadow-sm">
            Add New Check‑In
          </button>
        </Link>
        
      </div>

      <h1 className="text-4xl font-extrabold text-[#1A1A1A]">Your Past Check‑Ins</h1>

      {records.length === 0 ? (
        <p className="text-gray-600">No check‑ins found.</p>
      ) : (
        <ul className="space-y-6">
          {records.map((c) => (
            <li key={c.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  {new Date(c.date).toLocaleString()}
                </p>
                {c.sentimentScore != null && (
                  <span className={`font-semibold ${scoreColor(c.sentimentScore)}`}>
                    {c.sentimentScore}/10
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold">Q1: {c.question1}</p>
                  <p className="text-gray-700 mb-2">A1: {c.answer1}</p>
                  <p className="font-semibold">Q2: {c.question2}</p>
                  <p className="text-gray-700">A2: {c.answer2}</p>
                </div>
                <div>
                  <p className="font-semibold">Q3: {c.question3}</p>
                  <p className="text-gray-700 mb-2">A3: {c.answer3}</p>
                  <p className="font-semibold">Note:</p>
                  <p className="text-gray-700">{c.personalNote}</p>
                </div>
              </div>

              {c.sentimentLabel && (
                <div className="mt-4 border-t pt-4 text-gray-800 space-y-1 flex items-center">
                  <span className="text-2xl mr-2">{moodEmoji(c.sentimentLabel)}</span>
                  <p><strong>Mood:</strong> {c.sentimentLabel}</p>
                </div>
              )}
              {c.productRec && (
                <div className="mt-2 text-gray-800">
                  <p><strong>Recommendation:</strong> {c.productRec}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

