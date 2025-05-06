'use client';

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles, NotebookPen, Smile } from 'lucide-react';

export default function CheckInLandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // While session is loading, render a blank or spinner
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]" />
      </div>
    );
  }

  const handleGetStarted = () => {
    if (session) router.push('/chatpage');
    else router.push('/login');
  };
  const handleGoToAnalytics = () => {
    if (session) router.push('/checkinanalytics');
    else router.push('/login');
  };
  const handleGoToCheckInHistory = () => {
    if (session) router.push('/usercheckinhistory');
    else router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-500">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-[#1A1A1A]">
          Welcome to <span className="text-[#B03C3C]">Study Checks</span>
        </h1>
        <p className="text-lg text-[#555759]">
          Your personal reflection assistant. Track your daily study progress, understand how you feel, and get smart insights with AI.
        </p>

        <div className="flex justify-center gap-12 mb-10 flex-wrap">
          <Feature icon={<NotebookPen size={35} />} title="Daily Reflections" description="Capture what you study each day." />
          <Feature icon={<Smile size={35} />} title="Sentiment Insights" description="AI gauges how you feel & motivates you." />
          <Feature icon={<Sparkles size={35} />} title="Progress Tracking" description="Watch your growth over time." />
        </div>

        {!session ? (
          <button
            onClick={() => signIn()}
            className="text-white text-lg font-semibold px-8 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 transition shadow-lg"
          >
            Log in to Get Started
          </button>
        ) : (
          <div className="flex justify-center gap-6">
            <button
              onClick={handleGetStarted}
              className="text-white text-lg font-semibold px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 transition shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={handleGoToAnalytics}
              className="text-white text-lg font-semibold px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 transition shadow-lg"
            >
              Analytics
            </button>
            <button
              onClick={handleGoToCheckInHistory}
              className="text-white text-lg font-semibold px-6 py-3 rounded-xl bg-[#C8102E] hover:bg-red-800 transition shadow-lg"
            >
              History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-[150px]">
      <div className="mb-2 text-[#C8102E]">{icon}</div>
      <h3 className="font-semibold text-[#1A1A1A]">{title}</h3>
      <p className="text-sm text-[#555759]">{description}</p>
    </div>
  );
}
