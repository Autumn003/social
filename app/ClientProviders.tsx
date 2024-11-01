// app/ClientProviders.tsx
"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const googleAuthClientID = process.env.GoogleClientID || "";
const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
