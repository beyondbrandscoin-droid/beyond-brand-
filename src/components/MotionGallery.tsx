import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const IMAGES = [
  'https://images.unsplash.com/photo-1541339906662-349f7e4dfb80?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2669&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop'
];

export default function MotionGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  return (
    <section ref={containerRef} className="relative w-full py-40 overflow-hidden bg-dark-bg z-30" id="vision">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex flex-col items-center text-center mb-24 px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <h2 className="font-display font-medium text-4xl md:text-5xl text-white tracking-tight uppercase">
            Visual <span className="text-white/30 italic font-serif lowercase tracking-normal">aesthetic</span>
          </h2>
        </motion.div>
      </div>

      <motion.div 
        style={{ x: xTransform }}
        className="flex gap-8 md:gap-16 px-[10vw] w-[150vw] md:w-[120vw]"
      >
        {IMAGES.map((src, idx) => (
          <div key={idx} className="relative w-[60vw] md:w-[35vw] aspect-[4/3] rounded-sm overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
            <motion.img 
              src={src} 
              alt={`Gallery ${idx}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute bottom-6 left-6 z-20 pointer-events-none mix-blend-difference text-white">
              <span className="font-mono text-xs uppercase tracking-[0.2em]">Project 0{idx + 1}</span>
            </div>
          </div>
        ))}
      </motion.div>

    </section>
  );
}
