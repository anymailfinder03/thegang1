import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import About from '@/components/About';
import Tokenomics from '@/components/Tokenomics';
import TheGang from '@/components/TheGang';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="font-gochi">
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <Tokenomics />
      <TheGang />
      <Roadmap />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
