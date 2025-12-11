import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/918980090465"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </motion.div>
      
      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-500"
        animate={{ 
          scale: [1, 1.5],
          opacity: [0.5, 0]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.a>
  );
}
