import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Trust from './components/Trust';
import LeadForm from './components/LeadForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <header>
        <Hero />
      </header>
      <main>
        <HowItWorks />
        <Services />
        <Trust />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
