import { motion } from 'motion/react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioDialog } from './PortfolioDialog';
import { useLanguage } from '../lib/LanguageContext';
import empreinteImg from '../assets/Empreinte.png';
import hrmImg from '../assets/HRM.png';
import iThinkImg from '../assets/iThink.png';
import portfolioImg from '../assets/Portolio.png';
import tsManagerImg from '../assets/TS-Manager.png';
import thoughtFlowImg from '../assets/ThoughtFlow.png';

const projects = [
  {
    title: 'Empreinte',
    categoryKey: 'webApplication' as const,
    img: empreinteImg,
    descriptionKey: 'empreinteDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/empreinte',
    websiteUrl: 'https://empreinte.vercel.app',
  },
  {
    title: 'TS Manager',
    categoryKey: 'fullStack' as const,
    img: tsManagerImg,
    descriptionKey: 'tsManagerDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/ts-manager',
  },
  {
    title: 'iThink',
    categoryKey: 'backendService' as const,
    img: iThinkImg,
    descriptionKey: 'iThinkDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/ithink-full',
    websiteUrl: 'https://ithink.ct.ws/',
  },
  {
    title: 'Thought Flow',
    categoryKey: 'backendService' as const,
    img: thoughtFlowImg,
    descriptionKey: 'thoughtFlowDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/Thought-Flow-Backend',
  },
  {
    title: 'Portfolio',
    categoryKey: 'website' as const,
    img: portfolioImg,
    descriptionKey: 'portfolioDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/portfolio',
    websiteUrl: 'https://zouatinezakaria.vercel.app',
  },
  {
    title: 'Human Resource Management ',
    categoryKey: 'crossPlatform' as const,
    img: hrmImg,
    descriptionKey: 'hrmDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/hrm',
    //downloadUrl: '#',
  },
];

export function Portfolio() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <section id="portfolio" className="pt-25 px-6 md:px-12 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-white mb-4">{t('portfolioTitle')}</h2>
          <p className="text-gray-400 max-w-2xl">
            {t('portfolioDescription')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const cardRef = useRef<HTMLDivElement>(null);

            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer perspective-1000"
                onClick={() => handleProjectClick(project)}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
              >
                <motion.div
                  className="relative"
                  whileHover={{
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="aspect-[3/2] rounded-2xl bg-white border border-white/5 group-hover:border-white/10 transition-all duration-300 mb-4 overflow-hidden flex items-center justify-center p-4 relative z-10 group-hover:shadow-2xl group-hover:shadow-[#3b82f6]/20">
                    <ImageWithFallback
                      src={project.img}
                      alt={project.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-500">{t(project.categoryKey)}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {isDialogOpen && selectedProject && (
        <PortfolioDialog
          project={selectedProject}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}