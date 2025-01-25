import { DashboardHeader } from "./components/DashboardHeader";
import { EngagementOverview } from "./components/EngagementOverview";
import { InteractionHistory } from "./components/InteractionHistory";
import { LeaderboardSection } from "./components/LeaderboardSection";
import { PointsBreakdown } from "./components/PointsBreakdown";
import { TwitterInteractionsProvider } from "./components/TwitterInteractionsProvider";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50">
        <TwitterInteractionsProvider>
          <div className="container mx-auto px-4 py-8">
            <DashboardHeader />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <EngagementOverview />
              <PointsBreakdown />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="lg:col-span-2">
                <InteractionHistory />
              </div>
              <LeaderboardSection />
            </div>
          </div>
        </TwitterInteractionsProvider>
      </div>
    </div>
  );
}