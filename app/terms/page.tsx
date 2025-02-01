import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50">
        <main className="container mx-auto px-4 py-8 max-w-4xl text-white">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold ">Terms of Service</h1>
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
                <h2 className="text-2xl font-semibold mb-4">
                  1. Agreement to Terms
                </h2>
                <p>
                  By accessing or using TweetAnalytics, you agree to be bound by
                  these Terms of Service and all applicable laws and
                  regulations. If you do not agree with any of these terms, you
                  are prohibited from using or accessing this service.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p>
                  Permission is granted to temporarily access TweetAnalytics for
                  personal, non-commercial use only. This is the grant of a
                  license, not a transfer of title, and under this license you
                  may not:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>
                    Attempt to reverse engineer any software contained within
                    TweetAnalytics
                  </li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>
                    Transfer the materials to another person or mirror the
                    materials on any other server
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
                <p>To use TweetAnalytics, you must:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Connect a valid Twitter account</li>
                  <li>Connect a compatible cryptocurrency wallet</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account</li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  4. Service Rules
                </h2>
                <p>
                  You agree not to engage in any of the following prohibited
                  activities:
                </p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Using the service for any illegal purpose</li>
                  <li>Attempting to manipulate engagement metrics</li>
                  <li>Creating multiple accounts to abuse the reward system</li>
                  <li>Interfering with or disrupting the service</li>
                  <li>Accessing the service through automated means</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  5. Rewards and Points
                </h2>
                <p>
                  Points and rewards earned through TweetAnalytics are subject
                  to our verification and anti-fraud measures. We reserve the
                  right to modify, suspend, or terminate the rewards program at
                  any time.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
                <p>
                  The materials on TweetAnalytics are provided on an 'as is'
                  basis. We make no warranties, expressed or implied, and hereby
                  disclaim and negate all other warranties including, without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">7. Limitations</h2>
                <p>
                  In no event shall TweetAnalytics or its suppliers be liable
                  for any damages (including, without limitation, damages for
                  loss of data or profit, or due to business interruption)
                  arising out of the use or inability to use TweetAnalytics.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">
                  8. Modifications
                </h2>
                <p>
                  We reserve the right to revise these terms of service at any
                  time without notice. By using TweetAnalytics, you agree to be
                  bound by the current version of these terms of service.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                <p>
                  If you have any questions about these Terms of Service, please
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
