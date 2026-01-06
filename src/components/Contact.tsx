import React from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Instagram, Linkedin, MessageCircle, User, FileText } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/DE-TeAcH' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/z.de_zakaria/' },
  { icon: Mail, label: 'Email', href: 'mailto:zouatine.de.zakaria@gmail.com' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/213792448495', text: '+213 792 448 495' },
];

export function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      type: 'contact',
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="pt-25 pb-10 px-6 md:px-12 max-w-[1440px] mx-auto">
      {/* Section Header - Aligned like other sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl text-white mb-4">{t('contactTitle')}</h2>
        <p className="text-gray-400 max-w-2xl">
          {t('contactDescription')}
        </p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-[#141414] border border-white/5 relative z-10 flex flex-col items-center"
        >
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
            {/* Name Field */}
            <div className="text-left">
              <label htmlFor="name" className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#141414] border border-white/5 text-white placeholder-gray-600 focus:border-[#3b82f6]/30 focus:outline-none transition-colors duration-300"
                placeholder={t('namePlaceholder')}
              />
            </div>

            {/* Email Field */}
            <div className="text-left">
              <label htmlFor="email" className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#141414] border border-white/5 text-white placeholder-gray-600 focus:border-[#3b82f6]/30 focus:outline-none transition-colors duration-300"
                placeholder={t('emailPlaceholder')}
              />
            </div>

            {/* Subject Field */}
            <div className="text-left">
              <label htmlFor="subject" className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                {t('subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#141414] border border-white/5 text-white placeholder-gray-600 focus:border-[#3b82f6]/30 focus:outline-none transition-colors duration-300"
                placeholder={t('subjectPlaceholder')}
              />
            </div>

            {/* Message Field */}
            <div className="text-left">
              <label htmlFor="message" className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5" />
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#141414] border border-white/5 text-white placeholder-gray-600 focus:border-[#3b82f6]/30 focus:outline-none transition-colors duration-300 resize-none"
                placeholder={t('messagePlaceholder')}
              />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <p className="text-green-500 text-sm">Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>
            )}

            {/* Send Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-2 text-sm bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-lg text-[#60a5fa] hover:bg-[#3b82f6]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : t('sendMessage')}
            </button>
          </form>
        </motion.div>

        {/* Right Side - Get in Touch */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <div className="space-y-4 text-center relative z-10 p-8 rounded-2xl bg-[#0a0a0a]">
            <h3 className="text-2xl md:text-3xl text-white">{t('getInTouch')}</h3>
            <p className="text-gray-400 leading-relaxed">
              {t('getInTouchDesc')}
            </p>
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center justify-center gap-4 relative z-10">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-[#141414] border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300 text-gray-400 hover:text-[#60a5fa]"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center text-sm text-gray-600"
      >
        <p>© {new Date().getFullYear()} {t('footerText')}</p>
      </motion.div>
    </section >
  );
}