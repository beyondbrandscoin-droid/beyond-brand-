import React, { useEffect, useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Hero from './components/Hero';
import InteractiveServices from './components/InteractiveServices';
import MotionGallery from './components/MotionGallery';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cinematic load delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-dark-bg flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="font-display font-medium text-white/50 tracking-[0.5em] text-sm uppercase"
            >
              Loading Sequence
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="bg-dark-bg text-white selection:bg-primary-orange selection:text-black overflow-hidden relative"
          >
            {/* Global Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary-orange opacity-[0.08] blur-[140px] rounded-full pointer-events-none z-0" />
            <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-primary-orange opacity-[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

            {/* Grain Overlay */}
            <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-difference bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')]" />
            
            {/* Subtle Vignette */}
            <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-50" />
            
            <Cursor />
            <Header />
            <main>
              <Hero />
              <InteractiveServices />
              <MotionGallery />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </SmoothScroll>
  );
}
