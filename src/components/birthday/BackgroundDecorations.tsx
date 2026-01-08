import { motion } from 'framer-motion';

const TeddyBear = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="25" cy="25" r="15" opacity="0.9" />
    <circle cx="75" cy="25" r="15" opacity="0.9" />
    <circle cx="50" cy="55" r="35" />
    <circle cx="50" cy="40" r="25" />
    <circle cx="42" cy="35" r="4" fill="hsl(330, 30%, 20%)" />
    <circle cx="58" cy="35" r="4" fill="hsl(330, 30%, 20%)" />
    <ellipse cx="50" cy="45" rx="6" ry="4" fill="hsl(350, 100%, 75%)" />
    <path d="M 44 50 Q 50 55 56 50" stroke="hsl(330, 30%, 20%)" strokeWidth="2" fill="none" />
    <circle cx="35" cy="60" r="8" opacity="0.8" />
    <circle cx="65" cy="60" r="8" opacity="0.8" />
  </svg>
);

const Cat = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <polygon points="20,40 30,10 40,40" />
    <polygon points="60,40 70,10 80,40" />
    <ellipse cx="50" cy="60" rx="35" ry="30" />
    <ellipse cx="50" cy="45" rx="25" ry="20" />
    <ellipse cx="40" cy="42" rx="5" ry="6" fill="hsl(330, 30%, 20%)" />
    <ellipse cx="60" cy="42" rx="5" ry="6" fill="hsl(330, 30%, 20%)" />
    <circle cx="40" cy="40" r="2" fill="white" />
    <circle cx="60" cy="40" r="2" fill="white" />
    <ellipse cx="50" cy="52" rx="4" ry="3" fill="hsl(350, 100%, 75%)" />
    <line x1="20" y1="50" x2="35" y2="52" stroke="hsl(330, 30%, 20%)" strokeWidth="1.5" />
    <line x1="20" y1="55" x2="35" y2="55" stroke="hsl(330, 30%, 20%)" strokeWidth="1.5" />
    <line x1="65" y1="52" x2="80" y2="50" stroke="hsl(330, 30%, 20%)" strokeWidth="1.5" />
    <line x1="65" y1="55" x2="80" y2="55" stroke="hsl(330, 30%, 20%)" strokeWidth="1.5" />
  </svg>
);

const Heart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

interface BackgroundDecorationsProps {
  variant?: 'cake' | 'envelope';
}

const BackgroundDecorations = ({ variant = 'cake' }: BackgroundDecorationsProps) => {
  const decorations = [
    { Component: TeddyBear, x: '5%', y: '10%', size: 80, delay: 0, color: 'text-birthday-peach' },
    { Component: Cat, x: '85%', y: '15%', size: 70, delay: 0.2, color: 'text-birthday-lavender' },
    { Component: TeddyBear, x: '90%', y: '70%', size: 60, delay: 0.4, color: 'text-birthday-pink' },
    { Component: Cat, x: '8%', y: '75%', size: 65, delay: 0.6, color: 'text-birthday-blue' },
    { Component: Heart, x: '15%', y: '40%', size: 30, delay: 0.8, color: 'text-birthday-pink' },
    { Component: Heart, x: '80%', y: '45%', size: 25, delay: 1, color: 'text-primary' },
    { Component: Star, x: '25%', y: '20%', size: 20, delay: 1.2, color: 'text-birthday-gold' },
    { Component: Star, x: '70%', y: '80%', size: 22, delay: 1.4, color: 'text-birthday-gold' },
    { Component: Heart, x: '50%', y: '5%', size: 28, delay: 1.6, color: 'text-birthday-pink' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-dreamy" />
      
      {/* Floating decorations */}
      {decorations.map(({ Component, x, y, size, delay, color }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-40`}
          style={{ left: x, top: y, width: size, height: size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{ 
              duration: 4 + index * 0.5, 
              repeat: Infinity, 
              ease: 'easeInOut',
            }}
          >
            <Component className="w-full h-full" />
          </motion.div>
        </motion.div>
      ))}

      {/* Sparkles */}
      {variant === 'envelope' && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-birthday-gold rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default BackgroundDecorations;
