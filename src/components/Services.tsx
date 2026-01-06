import { motion } from 'motion/react';
import { Code2, Smartphone, Server, Wrench } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Code2,
      titleKey: 'webDev' as const,
      descKey: 'webDevDesc' as const,
    },
    {
      icon: Smartphone,
      titleKey: 'mobileDev' as const,
      descKey: 'mobileDevDesc' as const,
    },
    {
      icon: Server,
      titleKey: 'backendDev' as const,
      descKey: 'backendDevDesc' as const,
    },
    {
      icon: Wrench,
      titleKey: 'productEnhancement' as const,
      descKey: 'productEnhancementDesc' as const,
    },
  ];

  return (
    <section id="services" className="pt-20 px-6 md:px-12 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl text-white mb-4">{t('servicesTitle')}</h2>
        <p className="text-gray-400 max-w-2xl">
          {t('servicesDescription')}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#60a5fa]">
                <service.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl text-white mb-2">{t(service.titleKey)}</h3>
                <p className="text-gray-400 leading-relaxed">{t(service.descKey)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}