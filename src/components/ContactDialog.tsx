import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, FileText, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export function ContactDialog({ isOpen, onClose, onSubmit }: ContactDialogProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      type: 'hire',
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
        setTimeout(() => {
          onSubmit(); // Call parent onSubmit to close dialog and show "Hired" state
          setStatus('idle');
        }, 1000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-[101]"
          >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mx-4 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl text-white">{t('contactTitle')}</h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t('namePlaceholder')}
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder={t('subjectPlaceholder')}
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t('message')}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={t('messagePlaceholder')}
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-[#3b82f6]/50 focus:bg-[#1a1a1a] transition-all resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === 'error' && (
                  <p className="text-red-500 text-sm">{t('contactError')}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-[#3b82f6] hover:bg-[#3b82f6]/90 rounded-lg text-white transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : t('sendMessage')}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}