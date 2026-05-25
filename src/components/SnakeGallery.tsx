import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const CARDS = [
  { id: 1, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", title: "Spatial Design", cat: "01 / IMMERSION" },
  { id: 2, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop", title: "Future Aesthetic", cat: "02 / VISCERAL" },
  { id: 3, src: "https://images.unsplash.com/photo-1518818419601-129665bc89ce?q=80&w=2874&auto=format&fit=crop", title: "Motion Physics", cat: "03 / DIMENSION" },
  { id: 4, src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2669&auto=format&fit=crop", title: "Generative Shape", cat: "04 / KINETIC" },
  { id: 5, src: "https://images.unsplash.com/photo-1541339906662-349f7e4dfb80?q=80&w=2670&auto=format&fit=crop", title: "Fluid Structure", cat: "05 / SYNTHESIS" },
];

export default function SnakeGallery() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [selectedCard, setSelectedCard] = useState<typeof CARDS[0] | null>(null);

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let isMoving = false;
    let moveTimeout: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      if (document.body.classList.contains('modal-open')) return;
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Position relative to the container for absolute positioning
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      
      isMoving = true;
      clearTimeout(moveTimeout);
      containerRef.current.classList.add('is-moving');
      
      moveTimeout = setTimeout(() => {
        isMoving = false;
        if (containerRef.current) containerRef.current.classList.remove('is-moving');
      }, 150);
    };

    window.addEventListener('mousemove', onMouseMove);

    let reqObj: number;
    let time = 0;
    
    // History buffer for snake trailing
    const history: {x: number, y: number}[] = [];
    const historyLength = 120; // Enough buffer for the delay
    
    for(let i=0; i<historyLength; i++) {
        history.push({...mouse});
    }

    const render = () => {
      time += 0.02;
      
      if (!document.body.classList.contains('modal-open') && containerRef.current) {
          history.unshift({...mouse});
          if (history.length > historyLength) history.pop();
          
          cardsRef.current.forEach((el, index) => {
            if (!el) return;
            
            // Trailing delay index
            let histIdx = index * 12 + 4; // Each subsequent card looks further back in history
            if (histIdx >= history.length) histIdx = history.length - 1;
            
            let targetX = history[histIdx].x;
            let targetY = history[histIdx].y;
            
            // Idle fan-out to prevent them from stacking completely on mouse stop
            if (!isMoving) {
              const spreadX = Math.sin(time + index) * (40 + index * 30);
              const spreadY = Math.cos(time + index * 0.8) * (40 + index * 30);
              targetX += spreadX;
              targetY += spreadY;
            }
            
            let currentX = parseFloat(el.getAttribute('data-x') || String(targetX));
            let currentY = parseFloat(el.getAttribute('data-y') || String(targetY));
            
            // Smooth lerp
            currentX += (targetX - currentX) * 0.12;
            currentY += (targetY - currentY) * 0.12;
            
            // For velocity-based physics (stretch and rotation)
            let vx = currentX - parseFloat(el.getAttribute('data-x') || String(currentX));
            let vy = currentY - parseFloat(el.getAttribute('data-y') || String(currentY));
            
            el.setAttribute('data-x', String(currentX));
            el.setAttribute('data-y', String(currentY));
            
            const speed = Math.sqrt(vx * vx + vy * vy);
            const rotation = (vx * 0.4) + (vy * 0.2); 
            
            const scaleY = Math.max(1, Math.min(1.15, 1 + speed * 0.005));
            const scaleX = Math.max(0.85, Math.min(1, 1 - speed * 0.002));
            
            // Z-index sorting: first card on top
            el.style.zIndex = String(50 - index);
            
            // Base transform
            el.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
          });
      }

      reqObj = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqObj);
    };
  }, []);

  return (
    <>
      <div 
        ref={containerRef} 
        className="absolute inset-0 pointer-events-none z-30"
        id="snake-gallery"
      >
        {CARDS.map((card, idx) => (
          <div
            key={card.id}
            ref={(el) => cardsRef.current[idx] = el}
            className={cn(
              "absolute top-0 left-0 w-[220px] md:w-[260px] aspect-[3/4] rounded-2xl pointer-events-auto",
              "glass-panel border-white/10 overflow-hidden cursor-pointer",
              "group transition-[border-color,box-shadow,filter] duration-500",
              "hover:border-primary-orange hover:shadow-[0_0_40px_rgba(255,122,0,0.3)]",
              "[.is-moving_&]:pointer-events-none" // disable interactions while moving rapidly
            )}
            onClick={() => {
              setSelectedCard(card);
              document.body.classList.add('modal-open');
            }}
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:bg-black/10" />
            
            <img 
              src={card.src} 
              alt={card.title} 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 blur-[2px] scale-110 group-hover:blur-0 group-hover:scale-105"
            />
            
            <div className="absolute bottom-6 left-6 z-20 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:translate-y-[-4px]">
              <p className="text-[9px] font-mono tracking-widest text-primary-orange mb-2">{card.cat}</p>
              <h3 className="font-display font-medium text-lg text-white leading-tight">{card.title}</h3>
            </div>
            
            {/* Play Button Indicator appears on hover */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-panel flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 delay-100">
               <div className="w-0 h-0 border-t-6 border-t-transparent border-l-[10px] border-l-white border-b-6 border-b-transparent ml-1"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Expand Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto glass-panel !bg-black/80 !backdrop-blur-xl"
            onClick={() => {
              setSelectedCard(null);
              document.body.classList.remove('modal-open');
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative w-[90vw] max-w-6xl aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
               <img 
                 src={selectedCard.src} 
                 alt={selectedCard.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-black/20 to-transparent pointer-events-none" />
               
               <div className="absolute bottom-12 left-12 md:bottom-16 md:left-16 z-20">
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-[12px] font-mono tracking-[0.4em] text-primary-orange mb-4 font-bold"
                 >
                    {selectedCard.cat}
                 </motion.p>
                 <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="font-display font-black text-5xl md:text-8xl text-white tracking-tighter"
                 >
                    {selectedCard.title}
                 </motion.h2>
               </div>
               
               <button 
                 onClick={() => {
                   setSelectedCard(null);
                   document.body.classList.remove('modal-open');
                 }}
                 className="absolute top-8 right-8 w-14 h-14 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors z-30 group"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
