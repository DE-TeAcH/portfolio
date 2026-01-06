import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';

interface TypeWriterProps {
  className?: string;
}

export function TypeWriter({ className = '' }: TypeWriterProps) {
  const { language } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  // Define text variants for each language
  const texts = {
    en: {
      fullText: 'Full-Stack\nDeveloper',
      typoText: 'Full-Stack\nDevelooe',
      deleteFrom: 'Full-Stack\nDevel',
    },
    ar: {
      fullText: 'مطور\nفول ستاك',
      typoText: 'مطور\nفول ستلك',
      deleteFrom: 'مطور\nفول ست',
    }
  };

  const currentTexts = texts[language];
  
  useEffect(() => {
    // Reset animation when language changes
    setDisplayText('');
    setCurrentStep(0);
  }, [language]);
  
  useEffect(() => {
    const steps = [
      // Step 0-1: Type with typo
      { text: currentTexts.typoText, action: 'type', speed: 100 },
      // Step 2: Pause
      { text: currentTexts.typoText, action: 'pause', speed: 600 },
      // Step 3: Delete typo characters
      { text: currentTexts.deleteFrom, action: 'delete', speed: 100 },
      // Step 4: Type correct ending
      { text: currentTexts.fullText, action: 'type', speed: 100 },
      // Step 5: Done - keep cursor
      { text: currentTexts.fullText, action: 'done', speed: 0 },
    ];

    const currentAction = steps[currentStep];
    if (!currentAction) return;

    if (currentAction.action === 'pause') {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, currentAction.speed);
      return () => clearTimeout(timer);
    }

    if (currentAction.action === 'delete') {
      if (displayText.length > currentAction.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, currentAction.speed);
        return () => clearTimeout(timer);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }

    if (currentAction.action === 'type') {
      if (displayText.length < currentAction.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentAction.text.slice(0, displayText.length + 1));
        }, currentAction.speed);
        return () => clearTimeout(timer);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  }, [displayText, currentStep, currentTexts]);

  const lines = displayText.split('\n');

  return (
    <div className={className}>
      <h1 className="text-5xl md:text-6xl text-white tracking-tight">
        {lines[0]}
        {lines[1] !== undefined && (
          <>
            <br />
            {lines[1]}
            <span className="inline-block w-0.5 h-[1em] bg-white ml-1 animate-pulse" />
          </>
        )}
      </h1>
    </div>
  );
}