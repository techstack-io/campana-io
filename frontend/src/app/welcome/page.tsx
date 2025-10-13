"use client";
import { SignInButton } from "@clerk/nextjs";

export default function Welcome() {
  return (
    <main className="min-h-screen grid place-items-center p-10">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Campana</h1>
        <p className="text-gray-600">Agentic learning for B2B buyers.</p>
        <SignInButton mode="modal">
          <button className="rounded bg-blue-600 px-4 py-2 text-white">Sign in</button>
        </SignInButton>
      </div>
    </main>
  );
}
