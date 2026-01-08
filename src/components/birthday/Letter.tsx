import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

interface LetterProps {
  visible: boolean;
}

const Letter = ({ visible }: LetterProps) => {
  if (!visible) return null;

  const message = `To My Dearest Mahnoor,

Happy Birthday to the most wonderful person I’ve ever known. You have the most beautiful heart, and being loved by you is the greatest gift of my life.  May your year ahead be full of the same joy you give to everyone else.! 🎉

Today is YOUR day, and I wanted to make it extra special because you deserve all the happiness in the world. ✨🩷

Your presence in my life is the greatest gift Allah has blessed me with.💕 Your soul has a way of making even the darkest days feel bright. I carry such a deep respect for the person you are, and I am endlessly grateful that our paths crossed. Thank you for simply being you. ❤️💞
 
I am endlessly thankful for every moment we've shared, the late-night talks where I feel truly seen. Our history is written in late-night talks and a thousand small moments that mean everything to me.👀❤️ I have so much respect for the person you are, the heart you carry and the way you love. Happy Birthday to my favorite person.💞💓

May this year bring you:
✨ Endless joy and laughter
🎀 Love in abundance

May Allah guide every step you take toward the Straight Path and fill your journey with Sabr and Shukr.🌟 
May Allah grants you the best of this Dunya and the highest ranks of Jannatul Firdaus.✨May He shower your life with endless Barakah and grant you a heart that finds rest in His remembrance.💖 
May Allah make you a source of peace for your family and grant you a heart that finds rest in His remembrance.💓

I entrust you to Allah’s care.🫶 May He protect you from every harm and evil eye, and keep your soul radiant with the light of Iman. 
May every silent prayer in your heart be answered by His infinite Mercy. Ameen.🤲 

May your Iman grow stronger with every passing day.✨ Wishing you complete Aafiyah (well-being) in your health, wealth, and faith.
May your life be illuminated with the Noor of the Quran.🌙
May Allah grant you a heart of gold that stays pure and sincere forever.🤍

May He accept all your righteous deeds and keep us together in this life and in Jannah. Ameen✨💞

I'm so grateful to have you in my life. Here's to another year of amazing memories together!🫰

With full of Akidat,
Always yours, my Âme Soeur. 💝

P.S. You're absolutely amazing, never forget that! 🌸`;

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Letter paper */}
      <motion.div
        className="relative p-8 md:p-10 rounded-lg shadow-cake"
        style={{
          background: 'linear-gradient(180deg, #FFF8F0 0%, #FFF5E6 50%, #FFEFDC 100%)',
          border: '2px solid hsl(30, 40%, 85%)',
        }}
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 rounded-lg opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Decorative border */}
        <div className="absolute inset-2 border-2 border-birthday-pink/20 rounded-lg pointer-events-none" />

        {/* Corner decorations */}
        <motion.div 
          className="absolute top-4 left-4 text-birthday-pink"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Heart className="w-6 h-6 fill-current opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute top-4 right-4 text-birthday-gold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-6 h-6 fill-current opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute bottom-4 left-4 text-birthday-lavender"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute bottom-4 right-4 text-birthday-pink"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Heart className="w-6 h-6 fill-current opacity-50" />
        </motion.div>

        {/* Edge doodles */}
        <div className="absolute left-2 top-1/4 text-lg opacity-40">🌸</div>
        <div className="absolute right-2 top-1/3 text-lg opacity-40">🦋</div>
        <div className="absolute left-2 bottom-1/3 text-lg opacity-40">🌷</div>
        <div className="absolute right-2 bottom-1/4 text-lg opacity-40">🌺</div>

        {/* Letter content */}
        <div className="relative z-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <pre 
              className="font-handwritten text-lg md:text-xl text-foreground/90 whitespace-pre-wrap leading-relaxed"
              style={{ fontFamily: 'Caveat, cursive' }}
            >
              {message}
            </pre>
          </motion.div>
        </div>

        {/* Wax seal on letter */}
        <motion.div
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #B76E79 0%, #8B4557 100%)',
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <Heart className="w-6 h-6 text-white fill-current" />
        </motion.div>
      </motion.div>

      {/* Floating hearts around letter */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-birthday-pink"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Heart className="w-4 h-4 fill-current" />
        </motion.div>
      ))}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(350, 100%, 86%);
          border-radius: 3px;
        }
      `}</style>
    </motion.div>
  );
};

export default Letter;
