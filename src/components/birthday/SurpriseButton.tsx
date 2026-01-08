import { motion } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';

interface SurpriseButtonProps {
  onClick: () => void;
  visible: boolean;
}

const SurpriseButton = ({ onClick, visible }: SurpriseButtonProps) => {
  if (!visible) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Floating hearts around button */}
      <div className="relative">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            style={{
              left: `${-20 + i * 50}px`,
              top: `${i % 2 === 0 ? -25 : 60}px`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>
        ))}
        
        <motion.button
          onClick={onClick}
          className="group relative px-10 py-5 rounded-2xl text-xl font-display font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400 shadow-glow transition-all overflow-hidden border-2 border-white/30"
          whileHover={{ scale: 1.08, y: -3 }}
          whileTap={{ scale: 0.98 }}
          animate={{
            boxShadow: [
              '0 0 30px hsl(350 100% 86% / 0.4), 0 0 60px hsl(350 100% 80% / 0.2)',
              '0 0 50px hsl(350 100% 86% / 0.6), 0 0 80px hsl(350 100% 80% / 0.3)',
              '0 0 30px hsl(350 100% 86% / 0.4), 0 0 60px hsl(350 100% 80% / 0.2)',
            ],
          }}
          transition={{
            boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Sparkle dots */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 25}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
          
          <span className="relative flex items-center gap-3 text-white drop-shadow-md">
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Gift className="w-7 h-7" />
            </motion.span>
            <span>I Have a Surprise for You!</span>
            <motion.span 
              className="text-2xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              💝
            </motion.span>
          </span>
        </motion.button>
      </div>

      <motion.div
        className="flex gap-3"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {['💕', '🌸', '✨', '🌸', '💕'].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, i % 2 === 0 ? 15 : -15, 0],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SurpriseButton;
