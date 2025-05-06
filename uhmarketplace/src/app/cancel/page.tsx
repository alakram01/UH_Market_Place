"use client";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled ❌</h1>
        <p className="text-gray-700">Your payment was not completed.</p>
        <p className="text-gray-500 mt-2">You can try again or explore other products.</p>
        <a href="/" className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Return to Marketplace
        </a>
      </div>
    </div>
  );
}
