import { motion } from 'motion/react';
import { useRef } from 'react';

const SERVICES = [
  { id: '01', title: 'Creative Direction', desc: 'Crafting visionary narratives that define the future of digital product experiences.' },
  { id: '02', title: 'Motion Design', desc: 'Fluid, physics-based animation systems that breathe life into static interfaces.' },
  { id: '03', title: '3D Interactions', desc: 'Immersive spatial layouts leveraging WebGL and modern performant rendering.' },
  { id: '04', title: 'Generative AI', desc: 'Integrating intelligent models perfectly into cinematic user flows.' },
];

export default function InteractiveServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 flex flex-col items-center justify-center bg-dark-bg z-30" id="work">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8">
        
        {/* Sticky Left Content */}
        <div className="w-full md:w-1/2 md:sticky md:top-32 h-fit">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary-orange font-mono text-[10px] tracking-widest uppercase mb-6">Expertise</p>
            <h2 className="font-display font-medium text-4xl md:text-6xl text-white leading-tight mb-8">
              Pioneering<br/>
              <span className="text-white/40">Digital Physics</span>
            </h2>
            <p className="text-white/50 font-sans text-sm md:text-base max-w-md leading-relaxed">
              We operate at the intersection of cinematic arts and modern web technology. Our approach rejects standard templated workflows in favor of bespoke, hand-crafted interactions that leave a lasting psychological impact.
            </p>
            
            <button className="mt-12 group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all">
              <span className="relative z-10 text-[11px] font-bold tracking-widest uppercase group-hover:text-white transition-colors duration-300">View Capabilities</span>
              <div className="absolute inset-0 bg-primary-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </motion.div>
        </div>

        {/* Right Scrollable List */}
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          {SERVICES.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-2xl group hover:border-white/20 transition-colors"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-white/30 text-xs tracking-widest">{service.id}</span>
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary-orange group-hover:text-primary-orange transition-all duration-300">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
              </div>
              <h3 className="font-display text-2xl text-white mb-4 group-hover:text-primary-orange transition-colors">{service.title}</h3>
              <p className="font-sans text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
