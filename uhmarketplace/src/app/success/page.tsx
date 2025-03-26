"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful! 🎉</h1>
        {sessionId ? (
          <>
            <p className="text-gray-700">Your session ID is:</p>
            <p className="mt-2 px-4 py-2 bg-gray-200 rounded-lg font-mono">{sessionId}</p>
          </>
        ) : (
          <p className="text-red-500">Session ID not found.</p>
        )}
        <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
