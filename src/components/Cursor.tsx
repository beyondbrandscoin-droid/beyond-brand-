import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Soft interpolated lag effect via springs
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      // 16 is half the width/height of the cursor (w-8 h-8 is 32px)
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const checkHover = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let hovering = false;
      
      // Traverse up to see if we are hovering over an interactive element
      while (target && target !== document.body) {
        const tagName = target.tagName?.toLowerCase();
        const classList = target.classList;
        
        if (
          tagName === 'button' || 
          tagName === 'a' ||
          classList?.contains('cursor-pointer') ||
          classList?.contains('glass-panel')
        ) {
          hovering = true;
          break;
        }
        target = target.parentElement;
      }
      
      setIsHovering(hovering);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary-orange pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-screen"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(255, 122, 0, 0.15)' : 'transparent',
        borderColor: isHovering ? 'rgba(255, 122, 0, 0)' : 'rgba(255, 122, 0, 0.5)',
      }}
      transition={{
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <motion.div 
        className="w-1 h-1 bg-primary-orange rounded-full"
        animate={{ 
           scale: isHovering ? 0 : 1,
           opacity: isHovering ? 0 : 1 
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
