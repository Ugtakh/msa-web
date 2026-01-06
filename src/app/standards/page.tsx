import Footer from "@/components/sections/FooterSection";
import Navbar from "@/components/Header";

import StandardTitle from "./_components/StandardTitle";
import Standardlist from "./_components/StandardList";

const Standards = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <StandardTitle />
          <Standardlist />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Standards;
