import { FeaturesSection } from "@/components/features-section";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { CtaSection } from "@/components/cta-section"
import { Navbar } from "@/components/navbar";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
import { Footer } from "@/components/footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  // if(!session){
  //   redirect('/signin')
  // }

  return (
    <div className="relative min-h-screen">
      <Navbar session={session}/>
      <main>
        <HeroSection session={session} />
        <FeaturesSection />
        <HowItWorks />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
