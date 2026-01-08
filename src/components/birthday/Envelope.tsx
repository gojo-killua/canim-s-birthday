import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

const Envelope = ({ onOpen, isOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onOpen}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.02, y: -5 }}
      style={{ perspective: '1000px' }}
    >
      {/* Envelope flap - BEHIND the body, opens by rotating backward */}
      <motion.div
        className="absolute -top-1 left-0 right-0 h-32 md:h-40 origin-bottom z-10"
        style={{
          clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
          background: 'linear-gradient(180deg, #FFEEF2 0%, #FFE4E1 50%, #FFF5EE 100%)',
          borderTop: '3px solid hsl(350, 100%, 86%)',
          borderLeft: '3px solid hsl(350, 100%, 86%)',
          borderRight: '3px solid hsl(350, 100%, 86%)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
        initial={{ rotateX: 0 }}
        animate={isOpen ? { 
          rotateX: -180, 
          z: 50,
        } : isHovered ? { 
          rotateX: -15,
        } : { 
          rotateX: 0 
        }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Flap decoration - small heart */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 top-1/2"
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        >
          <Heart className="w-5 h-5 text-birthday-pink/40 fill-current" />
        </motion.div>
        
        {/* Flap inner gradient */}
        <div 
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
            background: 'linear-gradient(to top, transparent 30%, rgba(255,182,193,0.15) 100%)',
          }}
        />
      </motion.div>

      {/* Envelope body */}
      <motion.div
        className="relative w-80 h-52 md:w-96 md:h-64 rounded-lg shadow-cake overflow-hidden z-20"
        style={{
          background: 'linear-gradient(180deg, #FFF8F5 0%, #FFF5EE 50%, #FFE4E1 100%)',
          border: '3px solid hsl(350, 100%, 86%)',
        }}
        animate={isHovered && !isOpen ? { 
          boxShadow: '0 25px 80px -20px hsl(350 100% 70% / 0.4)' 
        } : {}}
      >
        {/* Envelope inner shadow */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.03) 100%)',
          }}
        />

        {/* Inner fold lines for realism */}
        <div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background: `
              linear-gradient(135deg, transparent 48%, rgba(255,182,193,0.25) 50%, transparent 52%),
              linear-gradient(-135deg, transparent 48%, rgba(255,182,193,0.25) 50%, transparent 52%)
            `,
          }}
        />

        {/* Decorative elements on envelope */}
        <motion.div 
          className="absolute top-4 left-4 text-2xl"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🧸
        </motion.div>
        <motion.div 
          className="absolute top-4 right-4 text-2xl"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        >
          🐱
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-4 text-xl"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💐
        </motion.div>
        <motion.div 
          className="absolute bottom-4 right-4 text-xl"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          🌸
        </motion.div>

        {/* Hearts scattered on envelope */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${35 + (i % 2) * 15}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Heart className="w-4 h-4 text-pink-300 fill-current" />
          </motion.div>
        ))}

        {/* Wax seal - centered on envelope */}
        <motion.div
          className="absolute z-30"
          style={{ 
            left: 'calc(50% - 35px)',
            top: 'calc(50% - 20px)',
            transform: 'translate(-50%, -50%)'
          }}
          animate={
            isOpen 
              ? { scale: 0, opacity: 0, rotate: 180 } 
              : isHovered 
                ? { scale: 1.1, rotate: 5 } 
                : { scale: 1, rotate: 0, opacity: 1 }
          }
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.div 
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #E8737D 0%, #C94C5A 50%, #A33545 100%)',
              boxShadow: 'inset 3px 3px 6px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.2), 0 8px 25px rgba(200,60,80,0.4)',
            }}
            animate={!isOpen ? { 
              boxShadow: [
                'inset 3px 3px 6px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.2), 0 8px 25px rgba(200,60,80,0.4)',
                'inset 3px 3px 6px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.2), 0 8px 35px rgba(200,60,80,0.6)',
                'inset 3px 3px 6px rgba(255,255,255,0.3), inset -3px -3px 6px rgba(0,0,0,0.2), 0 8px 25px rgba(200,60,80,0.4)',
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              animate={!isOpen ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart className="w-10 h-10 text-white fill-current drop-shadow-md" />
            </motion.div>
          </motion.div>
          
          {/* Seal shine */}
          <div 
            className="absolute top-2 left-3 w-4 h-2 rounded-full"
            style={{ background: 'rgba(255,255,255,0.4)' }}
          />
        </motion.div>

        {/* Cute Bow Decoration */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: '-20px' }}
          animate={
            isHovered && !isOpen 
              ? { y: -5, rotate: [0, -3, 3, 0] } 
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left bow loop */}
          <motion.div 
            className="absolute w-14 h-14 rounded-full"
            style={{ 
              left: '-20px',
              top: '0px',
              background: 'linear-gradient(135deg, #FFB6D9 0%, #FF85C0 50%, #FF69B4 100%)',
              clipPath: 'ellipse(50% 60% at 70% 50%)',
              boxShadow: 'inset -2px 2px 6px rgba(255, 255, 255, 0.5), inset 2px -2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(255, 105, 180, 0.4)',
              transform: 'rotate(-15deg)'
            }}
            animate={!isOpen ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Right bow loop */}
          <motion.div 
            className="absolute w-14 h-14 rounded-full"
            style={{ 
              right: '-20px',
              top: '0px',
              background: 'linear-gradient(225deg, #FFB6D9 0%, #FF85C0 50%, #FF69B4 100%)',
              clipPath: 'ellipse(50% 60% at 30% 50%)',
              boxShadow: 'inset 2px 2px 6px rgba(255, 255, 255, 0.5), inset -2px -2px 6px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(255, 105, 180, 0.4)',
              transform: 'rotate(15deg)'
            }}
            animate={!isOpen ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
          />
          
          {/* Left ribbon tail */}
          <motion.div 
            className="absolute w-8 h-16 rounded-md"
            style={{ 
              left: '-12px',
              top: '18px',
              background: 'linear-gradient(180deg, #FF85C0 0%, #FF69B4 50%, #FF4D94 100%)',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 50% 85%, 0% 100%)',
              boxShadow: '0 4px 10px rgba(255, 105, 180, 0.35)',
              transform: 'rotate(-10deg)'
            }}
            animate={!isOpen ? {
              y: [0, 3, 0],
              rotate: [-10, -12, -10]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Tail shine */}
            <div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full opacity-40"
              style={{ background: 'rgba(255, 255, 255, 0.6)' }}
            />
          </motion.div>
          
          {/* Right ribbon tail */}
          <motion.div 
            className="absolute w-8 h-16 rounded-md"
            style={{ 
              right: '-12px',
              top: '18px',
              background: 'linear-gradient(180deg, #FF85C0 0%, #FF69B4 50%, #FF4D94 100%)',
              clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 50% 85%, 0% 100%)',
              boxShadow: '0 4px 10px rgba(255, 105, 180, 0.35)',
              transform: 'rotate(10deg)'
            }}
            animate={!isOpen ? {
              y: [0, 3, 0],
              rotate: [10, 12, 10]
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          >
            {/* Tail shine */}
            <div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full opacity-40"
              style={{ background: 'rgba(255, 255, 255, 0.6)' }}
            />
          </motion.div>
          
          {/* Center bow knot */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
            style={{ 
              top: '4px',
              background: 'radial-gradient(circle at 30% 30%, #FFD4E8 0%, #FFB6D9 30%, #FF85C0 60%, #FF69B4 100%)',
              boxShadow: 'inset 0 3px 8px rgba(255, 255, 255, 0.6), inset 0 -3px 8px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(255, 105, 180, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }}
            animate={!isOpen ? {
              scale: [1, 1.08, 1],
              boxShadow: [
                'inset 0 3px 8px rgba(255, 255, 255, 0.6), inset 0 -3px 8px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(255, 105, 180, 0.5)',
                'inset 0 3px 8px rgba(255, 255, 255, 0.6), inset 0 -3px 8px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(255, 105, 180, 0.7)',
                'inset 0 3px 8px rgba(255, 255, 255, 0.6), inset 0 -3px 8px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(255, 105, 180, 0.5)'
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.05 }}
          >
            {/* Knot highlight */}
            <div 
              className="absolute top-1.5 left-2 w-3 h-3 rounded-full"
              style={{ background: 'rgba(255, 255, 255, 0.7)', filter: 'blur(1px)' }}
            />
            
            {/* Center dot detail */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: 'rgba(255, 182, 193, 0.8)' }}
            />
          </motion.div>
          
          {/* Sparkle decorations around bow */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1"
              style={{
                left: `${-10 + i * 20}px`,
                top: `${-8 + (i % 2) * 10}px`,
                background: '#FFD700',
                borderRadius: '50%',
                boxShadow: '0 0 8px #FFD700'
              }}
              animate={!isOpen ? {
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Click hint */}
      <AnimatePresence>
        {!isOpen && (
          <motion.p
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground font-body text-sm whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💝 Click the heart to open 💝
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Envelope;
