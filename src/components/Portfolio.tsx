import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioDialog } from './PortfolioDialog';
import { useLanguage } from '../lib/LanguageContext';
import empreinteImg from '../assets/Empreinte.png';
import hrmImg from '../assets/HRM.png';
import iThinkImg from '../assets/iThink.png';
import portfolioImg from '../assets/Portolio.png';
import uniconnectImg from '../assets/uniconnect.png';
import AgiusImg from '../assets/agius.png';
import AccountTechImg from '../assets/accountech.png';
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
    title: 'iThink',
    categoryKey: 'backendService' as const,
    img: iThinkImg,
    descriptionKey: 'iThinkDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/ithink-full',
    websiteUrl: 'https://ithink.ct.ws/',
  },
  {
    title: 'UniConnect',
    categoryKey: 'website' as const,
    img: uniconnectImg,
    descriptionKey: 'UniConnectDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/UniConnect',
    websiteUrl: 'https://uniconnect-prj.vercel.app',
  },
  {
    title: 'TS Manager',
    categoryKey: 'platform' as const,
    img: tsManagerImg,
    descriptionKey: 'tsManagerDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/ts-manager',
  },
  {
    title: 'AccounTech',
    categoryKey: 'Mobile Application' as const,
    img: AccountTechImg,
    descriptionKey: 'AccounTechDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/AccounTech',
    //downloadUrl: '#',
  },
  {
    title: 'Agius Agency',
    categoryKey: 'website' as const,
    img: AgiusImg,
    descriptionKey: 'AgiusAgencyDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/agius',
    websiteUrl: 'https://agius-agency.vercel.app',
  },
  {
    title: 'Portfolio',
    categoryKey: 'platform' as const,
    img: portfolioImg,
    descriptionKey: 'portfolioDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/portfolio',
    websiteUrl: 'https://zouatinezakaria.vercel.app',
  },
  {
    title: 'Thought Flow',
    categoryKey: 'backendService' as const,
    img: thoughtFlowImg,
    descriptionKey: 'thoughtFlowDesc' as const,
    githubUrl: 'https://github.com/DE-TeAcH/Thought-Flow-Backend',
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

const DEFAULT_VISIBLE = 6;
const LOAD_MORE_COUNT = 3;

function ProjectCard({ project, index, onClick }: {
  project: typeof projects[0];
  index: number;
  onClick: (project: typeof projects[0]) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index >= DEFAULT_VISIBLE ? (index - DEFAULT_VISIBLE) * 0.1 : 0 }}
      className="group cursor-pointer perspective-1000"
      onClick={() => onClick(project)}
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
}

export function Portfolio() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE);
  const [hasExpanded, setHasExpanded] = useState(false);

  const handleProjectClick = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, projects.length));
    setHasExpanded(true);
  };

  const handleShowLess = () => {
    setVisibleCount(DEFAULT_VISIBLE);
  };

  const isAllVisible = visibleCount >= projects.length;
  const visibleProjects = projects.slice(0, visibleCount);

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
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onClick={handleProjectClick}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Buttons */}
        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {visibleCount > DEFAULT_VISIBLE && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              onClick={handleShowLess}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all duration-300 cursor-pointer text-sm font-medium backdrop-blur-sm"
            >
              {t('showLess')}
            </motion.button>
          )}
          {!isAllVisible && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
              onClick={handleShowMore}
              className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer text-sm font-medium backdrop-blur-sm"
            >
              {t('showMore')}
            </motion.button>
          )}
        </motion.div>
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
