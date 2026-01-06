import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative px-2 py-1.5 md:px-3 md:py-2 rounded-lg bg-[#141414] border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2 overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon - hidden on mobile */}
      <Globe className="w-4 h-4 text-gray-400 group-hover:text-[#60a5fa] transition-colors duration-300 relative z-10 hidden md:block" />
      
      {/* Language Text */}
      <span className="text-xs md:text-sm text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10 min-w-[1.5rem] md:min-w-[2rem] text-center">
        {language === 'en' ? 'AR' : 'EN'}
      </span>
    </motion.button>
  );
}