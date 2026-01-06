import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { SlideToHire } from './components/SlideToHire';
import { ContactDialog } from './components/ContactDialog';
import { LanguageProvider } from './lib/LanguageContext';
import { Snowfall } from './components/Snowfall';

export default function App() {
  const [currentSection, setCurrentSection] = useState('Welcome');
  const [hireInNav, setHireInNav] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isHired, setIsHired] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const handleHireComplete = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleDialogSubmit = () => {
    setShowDialog(false);
    setIsHired(true);
  };

  useEffect(() => {
    const sections = [
      { id: 'welcome', name: 'Welcome' },
      { id: 'services', name: 'Services' },
      { id: 'experience', name: 'Experience' },
      { id: 'portfolio', name: 'Portfolio' },
      { id: 'contact', name: 'Contact' },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].name);
          break;
        }
      }

      // Check if hire button should be in nav
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setHireInNav(window.scrollY > heroBottom - 200);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-[#0a0a0a] text-gray-100 min-h-screen">
        <Navigation 
          currentSection={currentSection} 
          showHireButton={hireInNav} 
          onHireComplete={handleHireComplete}
          isHired={isHired}
        />
        
        {/* Mobile-only fixed hire button - removed, now in Navigation */}

        <Hero ref={heroRef} hireInNav={hireInNav} onHireComplete={handleHireComplete} isHired={isHired} />
        <Services />
        <Experience />
        <Portfolio />
        <Contact />
        
        <ContactDialog
          isOpen={showDialog}
          onClose={handleDialogClose}
          onSubmit={handleDialogSubmit}
        />
        <Snowfall />
      </div>
    </LanguageProvider>
  );
}