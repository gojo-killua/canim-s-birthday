import { motion } from 'framer-motion';

interface BalloonsProps {
  active: boolean;
}

const Balloon = ({ color, delay, startX }: { color: string; delay: number; startX: number }) => {
  const drift = (Math.random() - 0.5) * 100;
  const rotate = (Math.random() - 0.5) * 30;

  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: startX }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ 
        y: '-150px', 
        opacity: [0, 1, 1, 0],
        x: drift,
        rotate: rotate,
      }}
      transition={{
        duration: 4,
        delay,
        ease: 'easeOut',
      }}
    >
      {/* Balloon body */}
      <div
        className="relative w-12 h-16 rounded-full shadow-lg"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}cc, ${color})`,
          boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.1), inset 5px 5px 15px rgba(255,255,255,0.3)`,
        }}
      >
        {/* Shine */}
        <div 
          className="absolute top-3 left-3 w-3 h-4 rounded-full"
          style={{ background: 'rgba(255,255,255,0.4)' }}
        />
        {/* Knot */}
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2"
          style={{
            background: color,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      </div>
      
      {/* String */}
      <motion.svg 
        className="absolute top-14 left-1/2 -translate-x-1/2" 
        width="20" 
        height="60" 
        viewBox="0 0 20 60"
        animate={{
          d: ['M10 0 Q5 20 10 40 Q15 50 10 60', 'M10 0 Q15 20 10 40 Q5 50 10 60'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      >
        <path
          d="M10 0 Q5 20 10 40 Q15 50 10 60"
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  );
};

const Balloons = ({ active }: BalloonsProps) => {
  if (!active) return null;

  const balloonConfigs = [
    { color: '#FFB6C1', delay: 0, startX: '10%' },
    { color: '#E6E6FA', delay: 0.2, startX: '25%' },
    { color: '#B0E0E6', delay: 0.4, startX: '40%' },
    { color: '#FFDAB9', delay: 0.3, startX: '55%' },
    { color: '#E0F8E0', delay: 0.5, startX: '70%' },
    { color: '#FF69B4', delay: 0.1, startX: '85%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {balloonConfigs.map((config, index) => (
        <Balloon
          key={index}
          color={config.color}
          delay={config.delay}
          startX={config.startX as unknown as number}
        />
      ))}
    </div>
  );
};

export default Balloons;
