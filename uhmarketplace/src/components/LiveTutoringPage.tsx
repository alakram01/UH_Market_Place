"use client";
import React, { useRef, useState } from "react";

export default function LiveTutoringPage() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [clientId] = useState("Your-Socket-ID");
  const [remotePeerId, setRemotePeerId] = useState("");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Live Tutoring</h1>
      <p>Your Socket ID: {clientId}</p>

      <div className="flex flex-col space-y-4">
        {/* Video elements for local and remote streams /}
        <div className="flex space-x-4">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-1/2 border" />
          <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 border" />
        </div>

        {/ Input field for remote peer ID /}
        <input
          type="text"
          value={remotePeerId}
          onChange={(e) => setRemotePeerId(e.target.value)}
          placeholder="Enter remote peer ID"
          className="mt-4 border px-2 py-1"
        />

        {/ Call control buttons */}
        <div className="flex space-x-4">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2">
            Start Call
          </button>
          <button className="mt-4 bg-green-500 text-white px-4 py-2">
            Join Call
          </button>
        </div>
      </div>
    </div>
  );
}