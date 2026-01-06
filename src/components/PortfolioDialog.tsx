import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Globe, Download } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Project {
  title: string;
  categoryKey: 'webApplication' | 'fullStack' | 'backendService' | 'website' | 'crossPlatform';
  img: string;
  descriptionKey: string;
  githubUrl?: string;
  websiteUrl?: string;
  downloadUrl?: string;
}

interface PortfolioDialogProps {
  project: Project | null;
  onClose: () => void;
}

export function PortfolioDialog({ project, onClose }: PortfolioDialogProps) {
  const { t } = useLanguage();
  
  if (!project) return null;

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] z-[101]"
        >
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl mx-4 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 flex-shrink-0">
              <h3 className="text-2xl text-white">{project.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto scrollbar-hide flex-1">
              {/* Project Image */}
              <div className="w-full aspect-video bg-white flex items-center justify-center p-8">
                <img
                  src={project.img}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {/* Description and Buttons */}
              <div className="p-6 space-y-6">
                {/* Category Tag */}
                <div className="inline-block px-3 py-1 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-sm text-[#60a5fa]">
                  {t(project.categoryKey)}
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {t(project.descriptionKey) || 'A sophisticated project showcasing modern development practices and elegant design solutions.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#141414] border border-white/10 rounded-lg text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      <span>{t('viewGithub')}</span>
                    </a>
                  )}

                  {project.websiteUrl && (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#141414] border border-white/10 rounded-lg text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      <Globe className="w-4 h-4" />
                      <span>{t('visitWebsite')}</span>
                    </a>
                  )}

                  {project.downloadUrl && (
                    <a
                      href={project.downloadUrl}
                      download
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#141414] border border-white/10 rounded-lg text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      <span>{t('download')}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}