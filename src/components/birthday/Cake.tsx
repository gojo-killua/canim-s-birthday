import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CakeProps {
  onCandlesReady: () => void;
  candlesBlown: boolean;
}

const Candle = ({ 
  index, 
  blown, 
  onAnimationComplete 
}: { 
  index: number; 
  blown: boolean;
  onAnimationComplete?: () => void;
}) => {
  const colors = ['#FFB6C1', '#B0E0E6', '#FFDAB9', '#E6E6FA'];
  const stripeColor = colors[index % colors.length];
  
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ 
        left: `${25 + index * 18}%`,
        bottom: '100%',
        transformOrigin: 'bottom',
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {/* Flame */}
      <motion.div
        className="relative mb-1"
        initial={{ scale: 1 }}
        animate={blown ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => {
          if (blown && index === 3 && onAnimationComplete) {
            onAnimationComplete();
          }
        }}
      >
        <motion.div
          className="w-3 h-5 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, #FFD700 0%, #FF6B35 60%, transparent 100%)',
            boxShadow: '0 0 15px #FF6B35, 0 0 30px #FFD700',
          }}
          animate={!blown ? {
            scaleX: [1, 1.1, 0.95, 1.05, 1],
            scaleY: [1, 0.95, 1.1, 0.98, 1],
            rotate: [-2, 2, -1, 1, -2],
          } : {}}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Inner glow */}
        <div 
          className="absolute inset-0 w-2 h-3 mx-auto mt-1 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, #FFFACD 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Smoke */}
      {blown && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0.6, 0], y: -40, scale: 1.5 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div 
            className="w-4 h-8 rounded-full blur-sm"
            style={{ background: 'rgba(180, 180, 180, 0.5)' }}
          />
        </motion.div>
      )}

      {/* Candle body */}
      <div 
        className="w-2.5 h-12 rounded-sm relative overflow-hidden"
        style={{ background: stripeColor }}
      >
        {/* Stripes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-1.5"
            style={{ 
              top: i * 8,
              background: i % 2 === 0 ? 'rgba(255,255,255,0.5)' : 'transparent',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Cake = ({ onCandlesReady, candlesBlown }: CakeProps) => {
  const [showCandles, setShowCandles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCandles(true);
      setTimeout(onCandlesReady, 800);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onCandlesReady]);

  const layers = [
    { width: 220, height: 60, color: 'linear-gradient(135deg, #FFB6C1 0%, #FF91A4 100%)', delay: 0.2, decorations: 'sprinkles' },
    { width: 180, height: 55, color: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)', delay: 0.6, decorations: 'flowers' },
    { width: 140, height: 50, color: 'linear-gradient(135deg, #B0E0E6 0%, #87CEEB 100%)', delay: 1.0, decorations: 'hearts' },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Soft glow behind cake */}
      <motion.div
        className="absolute -inset-12 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(255,182,193,0.5) 0%, rgba(230,230,250,0.3) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Sparkle ring around cake */}
      <motion.div
        className="absolute -inset-6 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
              left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 6)}%`,
              top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 6)}%`,
              boxShadow: '0 0 8px #FFD700',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
      
      {/* Plate */}
      <motion.div
        className="absolute bottom-0 w-72 h-8 rounded-full shadow-cake overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #FFF 0%, #F8F8F8 50%, #F0F0F0 100%)',
          border: '4px solid #FFD700',
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.4), inset 0 2px 6px rgba(255,255,255,0.9), 0 8px 30px rgba(0,0,0,0.1)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      >
        {/* Plate shimmer */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Cake layers container */}
      <div className="relative flex flex-col-reverse items-center mb-4">
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            className="relative"
            style={{ 
              width: layer.width,
              height: layer.height,
              marginTop: index > 0 ? -10 : 0,
              zIndex: layers.length - index,
            }}
            initial={{ y: -100 - (index * 50), opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: layer.delay,
              duration: 0.6,
              ease: [0.22, 0.68, 0.36, 1.1],
              opacity: { duration: 0.3 },
            }}
          >
            {/* Layer body with 3D depth */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{ background: layer.color }}
            >
              {/* Side shadow for 3D effect */}
              <div
                className="absolute inset-y-0 left-0 w-3"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.1), transparent)' }}
              />
              <div
                className="absolute inset-y-0 right-0 w-3"
                style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.08), transparent)' }}
              />
              {/* Subtle shine on top */}
              <div
                className="absolute top-0 inset-x-0 h-1/3"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)' }}
              />
            </div>
            
            {/* Frosting top with cream effect */}
            <div
              className="absolute top-0 left-0 right-0 h-5 rounded-t-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(to bottom, #FFF 0%, rgba(255,245,238,0.9) 60%, rgba(255,255,255,0.6) 100%)',
              }}
            >
              {/* Frosting shine */}
              <div
                className="absolute top-0 left-1/4 right-1/4 h-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              />
            </div>

            {/* Frosting drips with better styling */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-4 rounded-full"
                style={{
                  left: `${15 + i * 18}%`,
                  width: 8 + (i % 2) * 4,
                  height: 14 + (i % 3) * 6,
                  background: 'linear-gradient(to bottom, #FFF 0%, rgba(255,250,250,0.95) 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: layer.delay + 0.3 + i * 0.1, duration: 0.4 }}
              />
            ))}

            {/* Decorations */}
            {layer.decorations === 'sprinkles' && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-3 rounded-full"
                    style={{
                      left: `${8 + (i * 6)}%`,
                      top: `${25 + (i % 3) * 20}%`,
                      background: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF9FF3'][i % 5],
                      transform: `rotate(${(i * 45) % 180}deg)`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: layer.delay + 0.5 + i * 0.03 }}
                  />
                ))}
              </div>
            )}

            {layer.decorations === 'flowers' && (
              <div className="absolute inset-0 flex items-center justify-around px-4">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="relative w-5 h-5"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: layer.delay + 0.5 + i * 0.1, duration: 0.5 }}
                  >
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="absolute w-2.5 h-2.5 rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                          transform: `rotate(${j * 72}deg) translateY(-5px)`,
                          transformOrigin: 'center 10px',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        }}
                      />
                    ))}
                    <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500" />
                  </motion.div>
                ))}
              </div>
            )}

            {layer.decorations === 'hearts' && (
              <div className="absolute inset-0 flex items-center justify-around px-6">
                {[...Array(3)].map((_, i) => (
                  <motion.svg 
                    key={i} 
                    viewBox="0 0 24 24" 
                    className="w-5 h-5 drop-shadow-sm"
                    style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: layer.delay + 0.5 + i * 0.15, type: 'spring', stiffness: 300 }}
                  >
                    <defs>
                      <linearGradient id={`heartGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF69B4" />
                        <stop offset="100%" stopColor="#FF1493" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill={`url(#heartGrad${i})`}
                    />
                  </motion.svg>
                ))}
              </div>
            )}

            {/* Candles on top layer */}
            {index === 2 && showCandles && (
              <div className="absolute inset-x-0 top-0">
                {[0, 1, 2, 3].map((i) => (
                  <Candle 
                    key={i} 
                    index={i} 
                    blown={candlesBlown}
                    onAnimationComplete={() => {}}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Cake;
