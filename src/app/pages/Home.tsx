import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { FloralDivider } from "../components/FloralDivider";

export function Home() {
  return (
    <main>
      <Hero />
      <FloralDivider />
      <Projects />
      <FloralDivider />
      <About />
      <FloralDivider />
      <Contact />
    </main>
  );
}
