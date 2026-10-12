import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { SkyBackground } from "@/components/sky-background";
import { Team } from "@/components/team";

export default function HomePage() {
  return (
    <>
      <SkyBackground />
      <Navbar />
      <main id="main">
        <Hero />
        <Games />
        <About />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
