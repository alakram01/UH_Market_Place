'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, FormEvent } from 'react';
import { questions as questionPool } from './data/questions';

export default function ChatPage() {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [reflectionNote, setReflectionNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(questionPool).slice(0, 3);
    setQuestions(shuffled);
    setAnswers(Array(3).fill(''));
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflectionNote(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const email = session?.user?.email as string;
      const payload = {
        email,
        question1: questions[0], answer1: answers[0],
        question2: questions[1], answer2: answers[1],
        question3: questions[2], answer3: answers[2],
        personalNote: reflectionNote
      };

      const res = await fetch('/api/usercheckins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Failed to save check-in');
      }

      setSuccess(true);
      setAnswers(Array(3).fill(''));
      setReflectionNote('');
      setQuestions(shuffleArray(questionPool).slice(0, 3));
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        {/* Top nav buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <Link href="/checkinanalytics">
            <button className="px-4 py-2 border-2 border-[#C8102E] text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition">
              Analytics
            </button>
          </Link>
          <Link href="/usercheckinhistory">
            <button className="px-4 py-2 border-2 border-[#C8102E] text-[#C8102E] rounded-lg hover:bg-[#C8102E] hover:text-white transition">
              History
            </button>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-[#C8102E] mb-6">🧠 Daily Study Check-In</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {question}
              </label>
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📓 Daily Reflection / Notes / How do you feel today?
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
              value={reflectionNote}
              onChange={handleNoteChange}
              placeholder="Write anything else you'd like to reflect on today..."
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">Check-in saved!</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#C8102E] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Submit Reflection'}
          </button>
        </form>
      </div>
    </div>
  );
}


