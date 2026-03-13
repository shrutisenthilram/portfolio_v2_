import { Hero } from "../components/Hero";
import { MarqueeTicker } from "../components/MarqueeTicker";
import { Projects } from "../components/Projects";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <main>
      <Hero />

      <MarqueeTicker />

      <Projects />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-black/6" />
      </div>

      <About />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-black/6" />
      </div>

      <Skills />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="border-t border-black/6" />
      </div>

      <Contact />
    </main>
  );
}