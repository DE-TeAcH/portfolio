import { motion } from 'motion/react';
import { useLanguage } from '../lib/LanguageContext';

const skills = [
  'C',
  'HTML',
  'CSS',
  'Java',
  'Python',
  'JavaScript',
  'Next.Js',
  'Node.Js',
  'TypeScript',
  'React',
  'React Native',
  'PHP',
  'MySQL',
];

export function SkillsSlider() {
  const { dir } = useLanguage();
  // Duplicate the skills array for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];

  // Reverse animation direction for RTL
  const animationX = dir === 'rtl' ? [0, 50 + '%'] : [0, -50 + '%'];

  return (
    <div className="w-full overflow-hidden py-8 border-t border-white/5 ">
      <div className="relative flex">
        <motion.div
          animate={{
            x: animationX,
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-8 px-6 md:px-12"
        >
          {duplicatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-8 py-4 rounded-full bg-[#141414] border border-white/5 text-gray-300 whitespace-nowrap"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}