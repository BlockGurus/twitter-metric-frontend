import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { EngagementStats } from "./components/EngagementStats";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { SecretNetworkConnect } from "./components/SecretNetworkConnect";

const Home = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2832')] bg-cover bg-fixed">
      <div className="min-h-screen backdrop-blur-xl bg-black/50">
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <div className="container px-4 mx-auto">
            <SecretNetworkConnect />
          </div>
          <EngagementStats />

          <Testimonials />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
