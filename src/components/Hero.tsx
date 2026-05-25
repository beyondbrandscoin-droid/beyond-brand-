import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import SnakeGallery from './SnakeGallery';
import { cn } from '../lib/utils';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] flex flex-col justify-start pt-[20vh] items-center overflow-hidden">
      
      {/* Massive Typography */}
      <motion.div 
        style={{ y: textY }}
        className="absolute top-1/4 left-0 w-full px-4 flex flex-col items-center justify-center text-center pointer-events-none select-none z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="font-display font-black text-[20vw] leading-none tracking-tighter text-white/[0.03] uppercase overflow-visible whitespace-nowrap">
            Cinematic<br/>Motion
          </h1>
        </motion.div>
      </motion.div>

      {/* Floating Elements / Micro Labels */}
      <div className="absolute top-[30%] left-[10%] text-[9px] font-mono text-white/30 tracking-[0.5em] uppercase items-center gap-4 hidden md:flex z-10">
        <span className="text-primary-orange font-bold">Location</span>
        <span className="w-12 h-[1px] bg-white/20" />
        SYDNEY / LONDON / NYC
      </div>

      <div className="absolute bottom-[40%] right-[10%] text-[9px] font-mono text-white/30 tracking-[0.5em] uppercase flex flex-col items-end gap-2 hidden md:flex z-10 text-right">
        <span className="text-primary-orange font-bold">Availability</span>
        <span>Q3 — 2024 PROJECTS</span>
        <span className="w-12 h-[1px] bg-primary-orange/50 mt-2" />
      </div>

      <SnakeGallery />
      
      {/* Hero Foreground Content */}
      <motion.div 
        style={{ y: cardsY }}
        className="relative z-10 mt-[20vh] flex flex-col items-center w-full max-w-7xl mx-auto px-6 pointer-events-none"
      >
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30 hover:text-white/80 transition-colors"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDownRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Cinematic Ground Plane */}
      <div className="absolute bottom-[-100px] left-[-10%] w-[120%] h-[300px] z-40 pointer-events-none">
        <div className="w-full h-full bg-[#080808] rotate-[-2deg] flex flex-col justify-start pt-20 px-40 shadow-[0_-50px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Micro-dots pattern for texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          {/* Spotlight on Ground */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[2px] bg-primary-orange blur-md opacity-40"></div>
        </div>
      </div>
      
    </section>
  );
}
