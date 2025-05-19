'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { prisma } from '../../../../../prisma/prisma';
const AccountPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const router = useRouter();

  const defaultProfilePicUrl = 'https://www.google.com/imgres?q=aang&imgurl=https%3A%2F%2Foyster.ignimgs.com%2Fmediawiki%2Fapis.ign.com%2Favatar-the-last-airbender%2Fb%2Fb0%2FAang_img.jpg&imgrefurl=https%3A%2F%2Fwww.ign.com%2Fwikis%2Favatar-the-last-airbender-legend-of-korra%2FAvatar_Aang&docid=MNpgi0g0P6kmzM&tbnid=BBkSqQyFJdg-7M&vet=12ahUKEwjorP7_0q6NAxUBGtAFHQJrOjsQM3oECHAQAA..i&w=332&h=363&hcb=2&ved=2ahUKEwjorP7_0q6NAxUBGtAFHQJrOjsQM3oECHAQAA';
  useEffect(() => {
    if (session) {
      setName(session.user?.name || '');
      setProfilePicUrl(session.user?.image || defaultProfilePicUrl);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    try {
      const res = await axios.put('/api/user', {
        name,
        profilePicUrl,
      });

      if (res.status === 200) {
        toast.success('Account updated successfully!');
        router.refresh();
      } else {
        toast.error('Failed to update account.');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('An error occurred while updating the account.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">Update Account Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicUrl" className="block text-gray-700 font-bold mb-2">Profile Picture URL</label>
          <input
            type="text"
            id="profilePicUrl"
            value={profilePicUrl}
            onChange={(e) => setProfilePicUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Update Account</button>
      </form>
    </div>
  );
};

export default AccountPage;