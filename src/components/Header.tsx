import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-12 py-8 flex justify-between items-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-3 group cursor-pointer">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center group-hover:bg-primary-orange transition-colors">
          <div className="w-4 h-4 bg-black rotate-45"></div>
        </div>
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Aether Studio</span>
      </div>

      <nav className="pointer-events-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-8 shadow-2xl shadow-black/50">
        {['Studio', 'Work', 'Vision', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-widest font-medium text-white/70 hover:text-primary-orange transition-colors relative group">
            {item}
          </a>
        ))}
        <div className="w-1 h-1 bg-primary-orange rounded-full"></div>
      </nav>

      <div className="pointer-events-auto pointer-cursor group">
        <button className="relative overflow-hidden rounded-full font-sans text-[11px] font-bold tracking-widest uppercase px-8 py-4 bg-white text-black transition-all">
          <span className="relative z-10 transition-transform duration-500 inline-block group-hover:-translate-y-10">Start Project</span>
          <span className="absolute inset-0 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-primary-orange">Start Project</span>
        </button>
      </div>
    </motion.header>
  );
}
