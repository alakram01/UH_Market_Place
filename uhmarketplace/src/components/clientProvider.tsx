// app/components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/app/api/auth/hooks/auth-provider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
