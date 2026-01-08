import { motion } from 'framer-motion';

interface MusicNotesProps {
  active?: boolean;
}

const MusicNotes = ({ active = true }: MusicNotesProps) => {
  if (!active) return null;

  const notes = ['♪', '♫', '♬', '♩', '♪', '♫'];
  const colors = ['#FF69B4', '#FFB6C1', '#DDA0DD', '#FF1493', '#DB7093', '#FFC0CB'];

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {notes.map((note, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl font-bold"
          style={{
            left: `${15 + index * 14}%`,
            bottom: '30%',
            color: colors[index],
            textShadow: `0 0 10px ${colors[index]}`,
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.sin(index) * 30, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.8],
            rotate: [0, index % 2 === 0 ? 20 : -20, 0],
          }}
          transition={{
            duration: 3,
            delay: index * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  );
};

export default MusicNotes;
