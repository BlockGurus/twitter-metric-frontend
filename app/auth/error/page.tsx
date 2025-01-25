"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50 flex items-center justify-center">
        <div className="container px-4 mx-auto">
          <Card className="glassmorphic p-8 max-w-md mx-auto">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
              <p className="text-gray-300 mb-6">
                There was a problem signing you in. Please try again or contact support if the problem
                persists.
              </p>
              <Button asChild>
                <Link href="/auth/signin">
                  Try Again
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}