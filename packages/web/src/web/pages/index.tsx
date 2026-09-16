import { Nav } from "../components/nav";
import { Hero } from "../components/sections/hero";
import { Marquee } from "../components/sections/marquee";
import { Showcase } from "../components/sections/showcase";
import { Impact } from "../components/sections/impact";
import { About } from "../components/sections/about";
import { Contact } from "../components/sections/contact";
import { Footer } from "../components/sections/footer";

export default function Index() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Showcase />
        <Impact />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
