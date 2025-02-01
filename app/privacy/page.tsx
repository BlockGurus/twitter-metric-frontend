import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50">
        <main className="container mx-auto px-4 py-8 max-w-4xl text-white">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Back to Home
              </Link>
            </div>

            <div className="prose prose-gray prose-invert max-w-none">
              <p className="text-muted-foreground">
                Last updated: February 1, 2025
              </p>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  Welcome to TweetAnalytics. We respect your privacy and are
                  committed to protecting your personal data. This privacy
                  policy explains how we collect, use, and safeguard your
                  information when you use our service.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  2. Information We Collect
                </h2>
                <p>We collect information that you provide directly to us:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Twitter account information</li>
                  <li>Wallet address</li>
                  <li>Usage data and analytics</li>
                  <li>Engagement metrics</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  3. How We Use Your Information
                </h2>
                <p>We use the collected information for:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Providing and improving our services</li>
                  <li>Analyzing Twitter engagement</li>
                  <li>Calculating and distributing rewards</li>
                  <li>Communication about service updates</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate security measures to protect your
                  personal information. However, no method of transmission over
                  the internet is 100% secure.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Access your personal data</li>
                  <li>Request correction of your data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                  <a
                    href="mailto:support@tweetanalytics.com"
                    className="text-primary hover:underline ml-1"
                  >
                    support@tweetanalytics.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
