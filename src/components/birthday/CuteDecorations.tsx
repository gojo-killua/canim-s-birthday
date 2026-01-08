import { motion } from 'framer-motion';

const CuteDecorations = () => {
  const decorations = [
    { emoji: '🧸', x: '3%', y: '20%', delay: 0 },
    { emoji: '🐰', x: '92%', y: '25%', delay: 0.3 },
    { emoji: '🦋', x: '8%', y: '60%', delay: 0.6 },
    { emoji: '🌸', x: '88%', y: '55%', delay: 0.9 },
    { emoji: '🎀', x: '5%', y: '85%', delay: 1.2 },
    { emoji: '🌷', x: '90%', y: '80%', delay: 1.5 },
    { emoji: '💫', x: '15%', y: '10%', delay: 0.2 },
    { emoji: '✨', x: '82%', y: '12%', delay: 0.5 },
    { emoji: '🌟', x: '50%', y: '5%', delay: 0.8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {decorations.map((deco, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl md:text-3xl"
          style={{ left: deco.x, top: deco.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.7, 
            scale: 1,
            y: [0, -8, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            opacity: { delay: deco.delay, duration: 0.5 },
            scale: { delay: deco.delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
            y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 },
          }}
        >
          {deco.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default CuteDecorations;
