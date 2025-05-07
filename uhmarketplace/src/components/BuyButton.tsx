"use client";

import { useState } from "react";

export default function BuyButton({ priceId }: { priceId: string }) {
  console.log("Price ID inside BuyButton:", priceId);
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }), // Send the priceId to the checkout API
      });

      const data = await response.json();
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl; // Redirect to Stripe Checkout
      } else {
        alert("Error creating checkout session.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      disabled={loading}
    >
      {loading ? "Processing..." : "Buy Now"}
    </button>
  );
}
