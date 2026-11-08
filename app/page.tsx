import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Method from "@/components/sections/Method";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="contenu">
        <Hero />
        <Services />
        <About />
        <Projects />
        <Method />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
