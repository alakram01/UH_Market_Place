'use client';

import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

type DailySentiment = { date: string; avg: number };
type TopRec = { recommendation: string; count: number };

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const [daily, setDaily] = useState<DailySentiment[]>([]);
  const [top, setTop] = useState<TopRec[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/useranalytics')
        .then((res) => res.json())
        .then(({ dailySentiment, topRecs }) => {
          setDaily(
            dailySentiment.map((d: any) => ({
              date: d.date.slice(0, 10),
              avg: d._avg.sentimentScore,
            }))
          );
          setTop(
            topRecs.map((r: any) => ({
              recommendation: r.productRec,
              count: r._count.productRec,
            }))
          );
        })
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
        Sign in to view analytics
      </button>
    );

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Nav Buttons */}
      <div className="flex justify-end gap-4">
        <Link href="/usercheckinhistory">
          <button className="px-4 py-2 border-2 border-[#C8102E] bg-white text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition">
            View History
          </button>
        </Link>
        <Link href="/chatpage">
          <button className="px-4 py-2 border-2 border-[#C8102E] bg-white text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition">
            New Check‑In
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold">Study Insights Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sentiment Over Time */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">Average Sentiment Over Time</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={daily}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 10]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#C8102E"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Product Recommendations */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">
            Top Product Recommendations
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={top}>
              <XAxis dataKey="recommendation" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#B03C3C" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

