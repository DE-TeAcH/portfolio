import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface SlideToHireProps {
  onComplete?: () => void;
  compact?: boolean;
  isHired?: boolean;
}

export function SlideToHire({ onComplete, compact = false, isHired = false }: SlideToHireProps) {
  const { t, dir } = useLanguage();
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isRTL = dir === 'rtl';

  // Sizes based on mode
  const containerWidth = compact ? 140 : 240;
  const containerHeight = compact ? 40 : 48;
  const sliderSize = compact ? 32 : 40;

  // All hooks must be called unconditionally at the top level
  const textOpacity = useTransform(x, [0, 100], [1, 0]);
  const scaleX = useTransform(
    x, 
    isRTL ? [0, -(containerWidth - sliderSize - 8)] : [0, containerWidth - sliderSize - 8], 
    [0, 1]
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (!containerRef.current) return;
    
    const width = containerRef.current.offsetWidth;
    const maxDrag = width - sliderSize - 8;
    
    // Check if dragged to at least 85% of the way
    const dragAmount = isRTL ? -info.offset.x : info.offset.x;
    if (dragAmount >= maxDrag * 0.85) {
      x.set(isRTL ? -maxDrag : maxDrag);
      setIsComplete(true);
      if (onComplete) {
        setTimeout(() => onComplete(), 300);
      }
    } else {
      x.set(0);
    }
  };

  const handleDragStart = () => {
    if (!isComplete) {
      setIsDragging(true);
    }
  };

  const handleReset = () => {
    setIsComplete(false);
    x.set(0);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: containerWidth, height: containerHeight }}
      className="relative rounded-full bg-[#1a1a1a] border border-white/10 overflow-hidden"
    >
      {/* Background track */}
      <motion.div
        className="absolute inset-0 bg-[#3b82f6]/10"
        style={{
          scaleX: isHired ? 1 : scaleX,
          transformOrigin: isRTL ? 'right' : 'left',
        }}
      />

      {/* Text */}
      <motion.div
        style={{ opacity: (isComplete || isHired) ? 0 : textOpacity }}
        className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
          compact ? (isRTL ? 'pr-8' : 'pl-8') : ''
        }`}
      >
        <span className={`text-gray-400 ${compact ? 'text-[10px]' : 'text-sm'}`}>
          {isDragging ? t('slideToHire') : t('slideToHire')}
        </span>
      </motion.div>

      {/* Success text */}
      {(isComplete || isHired) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
            compact ? (isRTL ? 'pr-8' : 'pl-8') : ''
          }`}
        >
          <span className={`text-[#60a5fa] ${compact ? 'text-[10px]' : 'text-sm'}`}>{t('hired')}</span>
        </motion.div>
      )}

      {/* Slider button */}
      <motion.button
        style={{ 
          x: isHired ? (isRTL ? -(containerWidth - sliderSize - 8) : containerWidth - sliderSize - 8) : x, 
          width: sliderSize, 
          height: sliderSize,
          left: isRTL ? 'auto' : '4px',
          right: isRTL ? '4px' : 'auto',
        }}
        drag={(isComplete || isHired) ? false : 'x'}
        dragConstraints={{ 
          left: isRTL ? -(containerWidth - sliderSize - 8) : 0, 
          right: isRTL ? 0 : containerWidth - sliderSize - 8 
        }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={(isComplete && !isHired) ? handleReset : undefined}
        className={`absolute top-1 rounded-full bg-[#2a2a2a] border border-white/20 flex items-center justify-center ${
          (isComplete || isHired) ? 'cursor-default bg-[#3b82f6]/20 border-[#3b82f6]/40' : 'cursor-grab active:cursor-grabbing'
        } touch-none`}
        whileHover={{ scale: (isComplete || isHired) ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center justify-center text-gray-300">
          {isRTL ? (
            <>
              <ChevronLeft className={compact ? 'w-3 h-3' : 'w-5 h-5'} />
              <ChevronLeft className={compact ? 'w-3 h-3 -mr-2' : 'w-5 h-5 -mr-3'} />
            </>
          ) : (
            <>
              <ChevronRight className={compact ? 'w-3 h-3' : 'w-5 h-5'} />
              <ChevronRight className={compact ? 'w-3 h-3 -ml-2' : 'w-5 h-5 -ml-3'} />
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
}