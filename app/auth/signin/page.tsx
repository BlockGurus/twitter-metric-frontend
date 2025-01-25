"use client";

import { SignInForm } from "./SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50 flex items-center justify-center">
        <div className="container px-4 mx-auto">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}