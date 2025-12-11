import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export function useAnimatedCounter(
  end: number,
  duration: number = 2000,
  suffix: string = ''
) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const step = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return { count, ref, displayValue: `${count}${suffix}` };
}
