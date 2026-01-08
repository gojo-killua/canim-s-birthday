import { motion } from 'framer-motion';
import { Wind, Sparkles } from 'lucide-react';

interface BlowButtonProps {
  onClick: () => void;
  visible: boolean;
}

const BlowButton = ({ onClick, visible }: BlowButtonProps) => {
  if (!visible) return null;

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Floating wish text with sparkles */}
      <motion.div 
        className="flex items-center gap-1.5 text-foreground/80 text-sm font-body"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.span>
        <span>Blow into your microphone! 🎤 OR</span>
        <motion.span
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.span>
      </motion.div>
      
      <motion.button
        onClick={onClick}
        className="relative px-5 py-2.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 shadow-lg transition-all overflow-hidden border-2 border-white/30"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          boxShadow: [
            '0 8px 30px -8px rgba(244, 114, 182, 0.4)',
            '0 8px 40px -8px rgba(244, 114, 182, 0.6)',
            '0 8px 30px -8px rgba(244, 114, 182, 0.4)',
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* Wind effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
            style={{ left: `${30 + i * 20}%`, top: '50%' }}
            animate={{
              x: [0, 20, 40],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        
        <span className="relative flex items-center gap-1.5 drop-shadow-md">
          <motion.span
            animate={{ x: [0, 2, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Wind className="w-4 h-4" />
          </motion.span>
          <span>Click to Blow the Candles</span>
          <motion.span 
            className="text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🌬️
          </motion.span>
        </span>
      </motion.button>
      
      {/* Hint text */}
      {/* <motion.p
        className="text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      >
        (or blow into your microphone! 🎤)
      </motion.p> */}
    </motion.div>
  );
};

export default BlowButton;
