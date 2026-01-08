import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackgroundDecorations from '@/components/birthday/BackgroundDecorations';
import Cake from '@/components/birthday/Cake';
import Confetti from '@/components/birthday/Confetti';
import Balloons from '@/components/birthday/Balloons';
import BlowButton from '@/components/birthday/BlowButton';
import SurpriseButton from '@/components/birthday/SurpriseButton';
import FloatingHearts from '@/components/birthday/FloatingHearts';
import Sparkles from '@/components/birthday/Sparkles';
import CuteDecorations from '@/components/birthday/CuteDecorations';
import MusicNotes from '@/components/birthday/MusicNotes';

const CakePage = () => {
  const navigate = useNavigate();
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [candlesReady, setCandlesReady] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSurpriseButton, setShowSurpriseButton] = useState(false);

  // Split "Happy Birthday! 🎂" into individual characters for animation
  const titleText = "Happy Birthday Mahnoor!";
  const titleLetters = useMemo(() => titleText.split(''), []);
  const letterAnimationDuration = 0.1; // Duration for each letter
  const totalTitleAnimationTime = titleLetters.length * letterAnimationDuration + 0.5; // Extra delay before cake

  const handleCandlesReady = useCallback(() => {
    setCandlesReady(true);
  }, []);

  const handleBlowCandles = useCallback(() => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    
    // Start celebration after candles blow out
    setTimeout(() => {
      setShowCelebration(true);
    }, 600);
    
    // Show message
    setTimeout(() => {
      setShowMessage(true);
    }, 1500);
    
    // Show surprise button
    setTimeout(() => {
      setShowSurpriseButton(true);
    }, 2500);
  }, [candlesBlown]);

  const handleSurpriseClick = useCallback(() => {
    navigate('/envelope');
  }, [navigate]);

  // Microphone blow detection
  useEffect(() => {
    if (!candlesReady || candlesBlown) return;

    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let animationFrame: number;

    const startMicrophoneDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        microphone.connect(analyser);
        analyser.fftSize = 256;
        
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detectBlow = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);
          
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          
          if (average > 40) {
            handleBlowCandles();
            stream.getTracks().forEach(track => track.stop());
            if (audioContext) audioContext.close();
            return;
          }
          
          animationFrame = requestAnimationFrame(detectBlow);
        };
        
        detectBlow();
      } catch (error) {
        console.log('Microphone access denied, using button fallback');
      }
    };

    startMicrophoneDetection();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioContext) audioContext.close();
    };
  }, [candlesReady, candlesBlown, handleBlowCandles]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundDecorations variant="cake" />
      
      {/* Magical background effects */}
      <Sparkles count={15} />
      <CuteDecorations />
      <FloatingHearts count={4} active={titleAnimationComplete} />
      <MusicNotes active={candlesReady && !candlesBlown} />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 pt-12 pb-8">
        {/* Title with letter-by-letter animation */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {/* Decorative top flourish */}
          <motion.div
            className="flex justify-center gap-2 mb-3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* {['💖', '✨', '💖'].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xl"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.span>
            ))} */}
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-foreground mb-2 flex items-center justify-center whitespace-nowrap">
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * letterAnimationDuration,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                onAnimationComplete={() => {
                  if (index === titleLetters.length - 1) {
                    setTitleAnimationComplete(true);
                    // Add 2-second delay before showing cake
                    setTimeout(() => {
                      setShowCake(true);
                    }, 1000);
                  }
                }}
                className={letter === ' ' ? 'w-1.5 sm:w-2 md:w-3' : 'hover:text-primary transition-colors'}
                style={{
                  textShadow: '0 2px 10px rgba(255, 182, 193, 0.5)',
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: titleLetters.length * letterAnimationDuration + 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="ml-1 sm:ml-2 text-2xl sm:text-3xl md:text-5xl"
            >
              🎂
            </motion.span>
          </h1>
          
          <motion.p
            className="font-body text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: totalTitleAnimationTime, duration: 0.5 }}
          >
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ Make a wish... ✨
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Cake container - fixed height to prevent layout shift */}
        <motion.div 
          className="relative flex flex-col items-center justify-center mt-6"
          style={{ minHeight: '400px', minWidth: '300px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showCake ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {!showMessage ? (
              <motion.div
                key="cake-section"
                className="flex flex-col items-center justify-center"
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
              >
                {/* Glow effect behind cake */}
                {showCake && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                {showCake && (
                  <Cake 
                    onCandlesReady={handleCandlesReady}
                    candlesBlown={candlesBlown}
                  />
                )}
                
                {/* Blow button - positioned below the cake with fixed height to prevent layout shift */}
                <div className="mt-8 h-16 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {candlesReady && !candlesBlown && (
                      <BlowButton onClick={handleBlowCandles} visible={true} />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="celebration-section"
                className="flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Celebration emojis */}
                <motion.div 
                  className="flex justify-center gap-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {['🎉', '💖', '🎊', '💝', '🎉'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      className="text-2xl md:text-3xl"
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, i % 2 === 0 ? 10 : -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: Infinity, 
                        delay: i * 0.15,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
                
                <motion.h2 
                  className="font-display text-3xl md:text-5xl text-foreground mb-4"
                  style={{
                    textShadow: '0 4px 20px rgba(255, 105, 180, 0.4)',
                  }}
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Today is your Birthday!
                </motion.h2>
                <motion.p 
                  className="font-body text-xl text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Wishing you all the joy and happiness! 💕
                </motion.p>
                
                {/* Surprise button - now inside the same container */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: showSurpriseButton ? 1 : 0, y: showSurpriseButton ? 0 : 20 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <SurpriseButton 
                    onClick={handleSurpriseClick} 
                    visible={showSurpriseButton} 
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Celebration effects */}
      <Confetti active={showCelebration} />
      <Balloons active={showCelebration} />
      
      {/* Extra hearts burst on celebration */}
      {showCelebration && <FloatingHearts count={8} active={true} />}
    </div>
  );
};

export default CakePage;
