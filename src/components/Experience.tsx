import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useLanguage } from '../lib/LanguageContext';

import { TranslationKeys } from '../lib/translations';

interface ExperienceItem {
  roleKey: TranslationKeys;
  company: string;
  startMonth: TranslationKeys;
  startYear: string;
  endMonth: TranslationKeys | 'Present';
  endYear: string;
  descriptionKey: TranslationKeys;
}

const experiences: ExperienceItem[] = [
  {
    roleKey: "devManagerRole",
    company: "Digibookly",
    startMonth: "december",
    startYear: "2025",
    endMonth: "Present",
    endYear: "",
    descriptionKey: "devManagerDesc",
  },
  {
    roleKey: "fullStackDevRole",
    company: "Freelance",
    startMonth: "october",
    startYear: "2024",
    endMonth: "december",
    endYear: "2025",
    descriptionKey: "fullStackDevDesc",
  },
  {
    roleKey: "backendDevRole",
    company: "Freelance",
    startMonth: "december",
    startYear: "2023",
    endMonth: "july",
    endYear: "2024",
    descriptionKey: "backendRoleDesc",
  },
  {
    roleKey: "dataEntryRole",
    company: "GARDIENNAGE-PREVOYANCE-SECURITE Company",
    startMonth: "july",
    startYear: "2022",
    endMonth: "february",
    endYear: "2024",
    descriptionKey: "dataEntryDesc",
  },
];

export function Experience() {
  const { t } = useLanguage();
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);

  const formatDate = (month: TranslationKeys | 'Present', year: string) => {
    if (month === 'Present') return t('present');
    return `${t(month)} ${year}`;
  };

  return (
    <section
      id="experience"
      className="pt-25 px-6 md:px-12 max-w-[1440px] mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl text-white mb-4">
          {t('experienceTitle')}
        </h2>
        <p className="text-gray-400 max-w-2xl">
          {t('experienceDescription')}
        </p>
      </motion.div>

      {/* Desktop Timeline */}
      <div className="hidden md:block space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l-2 border-white/10 hover:border-[#3b82f6]/30 transition-colors duration-300"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#3b82f6]/20 border-2 border-[#3b82f6]/40" />

            <div className="pb-8">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl text-white">
                    {t(exp.roleKey)}
                  </h3>
                  <p className="text-[#60a5fa]">
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(exp.startMonth, exp.startYear)} - {formatDate(exp.endMonth, exp.endYear)}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                {t(exp.descriptionKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {experiences.map((exp, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => setSelectedExperience(exp)}
            className="w-full text-left p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <h3 className="text-lg text-white mb-1">
              {t(exp.roleKey)}
            </h3>
            <p className="text-[#60a5fa] text-sm">
              {exp.company}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="md:hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md p-8 rounded-2xl bg-[#141414] border border-white/10 z-50"
            >
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl text-white mb-1">
                    {t(selectedExperience.roleKey)}
                  </h3>
                  <p className="text-[#60a5fa]">
                    {selectedExperience.company}
                  </p>
                </div>

                <div className="flex gap-4 text-sm text-gray-400">
                  <div>
                    <span className="text-gray-500">
                      {t('start')}:{" "}
                    </span>
                    {formatDate(selectedExperience.startMonth, selectedExperience.startYear)}
                  </div>
                  <div>
                    <span className="text-gray-500">{t('end')}: </span>
                    {formatDate(selectedExperience.endMonth, selectedExperience.endYear)}
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed">
                  {t(selectedExperience.descriptionKey)}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}