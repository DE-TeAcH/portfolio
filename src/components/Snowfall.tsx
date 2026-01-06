import { motion } from 'motion/react';
import { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export function Snowfall() {
  const snowflakes = useMemo(() => {
    const flakes: Snowflake[] = [];
    const count = 50; // Number of snowflakes

    for (let i = 0; i < count; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position (%)
        size: Math.random() * 4 + 2, // Size between 2-6px
        duration: Math.random() * 10 + 15, // Fall duration between 15-25s
        delay: Math.random() * -20, // Random start delay
        opacity: Math.random() * 0.6 + 0.2, // Opacity between 0.2-0.8
        drift: Math.random() * 30 - 15, // Horizontal drift between -15 to 15px
      });
    }

    return flakes;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            top: '-10px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, flake.drift, -flake.drift / 2, flake.drift],
          }}
          transition={{
            y: {
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
              ease: 'linear',
            },
            x: {
              duration: flake.duration / 2,
              repeat: Infinity,
              delay: flake.delay,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </div>
  );
}
