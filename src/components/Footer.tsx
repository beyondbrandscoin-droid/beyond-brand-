import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="relative w-full h-screen bg-dark-bg flex flex-col justify-between overflow-hidden z-30" id="contact">
      
      {/* Background Glow */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full bg-primary-orange/10 blur-[150px] mix-blend-screen pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 mt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-mono text-primary-orange text-[11px] tracking-[0.4em] uppercase mb-8 font-bold">Ready to innovate</p>
          <h2 className="font-display font-bold text-[8vw] leading-[0.85] text-white tracking-tighter uppercase cursor-default">
            Start<br />The <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Shift</span>
          </h2>
          
          <div className="mt-16 flex justify-center">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden transition-all">
              <span className="relative z-10 text-[11px] font-bold tracking-widest uppercase group-hover:text-white transition-colors duration-300">Initiate Protocol</span>
              <div className="absolute inset-0 bg-primary-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-8 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-white/30 tracking-widest uppercase">
        <p>&copy; {new Date().getFullYear()} NEXUS STUDIO</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Awwwards</a>
        </div>
        <p>ALL SYSTEMS NOMINAL</p>
      </div>
      
    </footer>
  );
}
