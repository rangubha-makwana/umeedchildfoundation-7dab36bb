import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: LucideIcon;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = '+', label, icon: Icon, duration = 2000 }: AnimatedCounterProps) {
  const { count, ref, displayValue } = useAnimatedCounter(end, duration, suffix);

  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="w-8 h-8 text-primary" />
      </motion.div>
      <motion.span 
        className="text-4xl md:text-5xl font-bold text-foreground"
        key={count}
      >
        {displayValue}
      </motion.span>
      <span className="text-muted-foreground mt-2 font-medium">{label}</span>
    </motion.div>
  );
}
