import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FloatingHeartsProps {
  count?: number;
  active?: boolean;
}

const FloatingHearts = ({ count = 5, active = true }: FloatingHeartsProps) => {
  if (!active) return null;

  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + (i * (80 / Math.max(count - 1, 1))), // Spread evenly across screen
    delay: i * 1.5, // Stagger the hearts more
    duration: 6 + Math.random() * 2, // Slower, more gentle float
    size: 14 + Math.random() * 10, // Slightly smaller range
    color: ['#FFB6C1', '#FF69B4', '#FFC0CB'][Math.floor(Math.random() * 3)], // Softer pink tones
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart
            style={{
              width: heart.size,
              height: heart.size,
              color: heart.color,
              fill: heart.color,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
