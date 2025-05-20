// src/components/userActions/SignOutButton.tsx
"use client";
import React from "react";
import { msalinstance } from "@/app/api/auth/msalinstance";

export const SignOutButton = () => {
    const handleLogout = () => {
        msalinstance.logoutPopup();
    };

    return <button onClick={handleLogout}>Sign Out</button>;
};
