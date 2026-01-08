import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundDecorations from '@/components/birthday/BackgroundDecorations';
import Envelope from '@/components/birthday/Envelope';
import Letter from '@/components/birthday/Letter';
import FloatingHearts from '@/components/birthday/FloatingHearts';
import Sparkles from '@/components/birthday/Sparkles';

const EnvelopePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpenEnvelope = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    
    setTimeout(() => {
      setShowLetter(true);
    }, 800);
  }, [isOpen]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundDecorations variant="envelope" />
      <Sparkles count={10} />
      <FloatingHearts count={5} active={showLetter} />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative hearts */}
          <motion.div 
            className="flex justify-center gap-3 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {['💕', '✨', '💌', '✨', '💕'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
          
          <h1 
            className="font-display text-3xl md:text-5xl text-foreground mb-2"
            style={{
              textShadow: '0 2px 10px rgba(255, 182, 193, 0.5)',
            }}
          >
            A Special Letter for You 💌
          </h1>
          <AnimatePresence>
            {!isOpen && (
              <motion.p
                className="font-body text-lg text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ On this beautiful day, my heart has a message just for you...

... ✨
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Envelope or Letter */}
        <AnimatePresence mode="wait">
          {!showLetter ? (
            <motion.div
              key="envelope"
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                y: -50,
                transition: { duration: 0.5 }
              }}
            >
              <Envelope onOpen={handleOpenEnvelope} isOpen={isOpen} />
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Letter visible={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer message */}
        <AnimatePresence>
          {showLetter && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <motion.p 
                className="font-body text-muted-foreground text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Made with 💖 just for you
              </motion.p>
              <div className="flex justify-center gap-3 mt-3">
                {['🧸', '💝', '🌸', '💖', '🎀'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ 
                      y: [0, -8, 0],
                      scale: [1, 1.2, 1],
                      rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnvelopePage;
