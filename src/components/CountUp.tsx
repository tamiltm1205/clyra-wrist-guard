import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CountUpProps {
  from: number;
  to: number;
  duration: number;
  separator?: string;
  direction?: 'up' | 'down';
  className?: string;
}

const CountUp = ({ from, to, duration, separator = '', direction = 'up', className }: CountUpProps) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = direction === 'up' ? from : to;
    const endValue = direction === 'up' ? to : from;
    const totalChange = endValue - startValue;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (totalChange * easeOutQuart);
      
      setCount(Math.round(currentValue));
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration, direction]);

  const formatNumber = (num: number) => {
    return separator ? num.toLocaleString() : num.toString();
  };

  return (
    <span className={cn('font-mono', className)}>
      {formatNumber(count)}
    </span>
  );
};

export default CountUp;