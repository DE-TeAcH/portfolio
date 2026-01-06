import { motion, AnimatePresence } from 'motion/react';
import { Download } from 'lucide-react';
import { SlideToHire } from './SlideToHire';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../lib/LanguageContext';

interface NavigationProps {
  currentSection: string;
  showHireButton: boolean;
  onHireComplete: () => void;
  isHired: boolean;
}

export function Navigation({ currentSection, showHireButton, onHireComplete, isHired }: NavigationProps) {
  const { t, language, dir } = useLanguage();
  
  const handleHireComplete = () => {
    onHireComplete();
  };

  // Get translated section name
  const getSectionName = (section: string) => {
    const sectionMap: Record<string, string> = {
      'Welcome': t('welcome'),
      'Services': t('services'),
      'Experience': t('experience'),
      'Portfolio': t('portfolio'),
      'Contact': t('contact'),
    };
    return sectionMap[section] || section;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/60 border-b border-white/5"
      dir={dir}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-3 md:gap-0 min-h-[72px]">
        {/* Left side - Download button and section indicator */}
        <div className="flex items-center gap-3 md:gap-6">
          <a 
            href="/CV.pdf" 
            download="CV.pdf"
            className="px-3 md:px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#3b82f6]/90 transition-colors duration-300 flex items-center gap-2 text-sm text-white shrink-0"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">{t('downloadCV')}</span>
          </a>

          {/* Section indicator - shown on both mobile and desktop */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="text-xs md:text-sm text-gray-400 whitespace-nowrap"
            >
              {getSectionName(currentSection)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right side - Hire button and Language Toggle */}
        <div className="flex items-center gap-3 md:gap-3">
          {/* Mobile: Always show compact hire button */}
          <div className="md:hidden">
            <SlideToHire onComplete={handleHireComplete} compact isHired={isHired} />
          </div>
          
          {/* Desktop: Show only when scrolled */}
          <AnimatePresence>
            {showHireButton && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden md:flex md:items-center w-60 h-10"
              >
                <SlideToHire onComplete={handleHireComplete} isHired={isHired} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Language Toggle - Always visible */}
          <LanguageToggle />
        </div>
      </div>
    </motion.nav>
  );
}