import { forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SkillsSlider } from './SkillsSlider';
import { SlideToHire } from './SlideToHire';
import { TypeWriter } from './TypeWriter';
import { useLanguage } from '../lib/LanguageContext';
import profileImg from '../assets/Me.png';

interface HeroProps {
  hireInNav: boolean;
  onHireComplete: () => void;
  isHired: boolean;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(({ hireInNav, onHireComplete, isHired }, ref) => {
  const { t } = useLanguage();

  const handleHireComplete = () => {
    onHireComplete();
  };

  return (
    <section
      id="welcome"
      ref={ref}
      className="min-h-screen pt-28 px-6 md:px-12 max-w-[1440px] mx-auto flex flex-col"
    >
      <div className="flex-1 flex items-center">
        <div className="w-full grid md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <TypeWriter />
            </div>

            <p className="text-lg text-gray-400 max-w-md leading-relaxed">
              {t('heroGreeting')}, {t('heroName')} - {t('heroDescription')}
            </p>

            {/* Slide to Hire Button - hidden on mobile, visible on desktop when not in nav */}
            <motion.div
              animate={{
                opacity: hireInNav ? 0 : 1,
                y: hireInNav ? -20 : 0,
              }}
              transition={{ duration: 0.4 }}
              className="mt-6 hidden md:block"
            >
              <SlideToHire onComplete={handleHireComplete} isHired={isHired} />
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-md mx-auto z-10"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-[#3b82f6]/20 blur-xl" />

            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#0a0a0a]">
              {/* Profile Image */}
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay for blend */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/10 to-transparent mix-blend-overlay" />

              {/* Border */}
              <div className="absolute inset-0 rounded-lg border-2 border-[#3b82f6]/30" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills Slider at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SkillsSlider />
      </motion.div>
    </section>
  );
});

Hero.displayName = 'Hero';