import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Particle } from '../types';

export const Background: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Mouse position motion values (centered at 0,0)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the parallax feel - slow and heavy
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    // Generate particles with depth
    const particleCount = 60; // Increased count for density
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 20 + 10, // Slower float
        delay: Math.random() * 10,
        depth: Math.random() * 0.5 + 0.1, // Depth factor for parallax
      });
    }
    setParticles(newParticles);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Calculate normalized position -0.5 to 0.5
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      // Update motion values (scaled for movement range)
      mouseX.set(x * 50); 
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []); // Empty dependency array as mouseX/Y are stable refs

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500 ease-in-out bg-soft-rose dark:bg-navy-deep">
      {/* Deep gradient background */}
      {/* Light Mode: Soft Rose -> Rose Gold -> White | Dark Mode: Navy -> Dark Slate -> Black */}
      <div className="absolute inset-0 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-soft-rose via-rose-gold to-white dark:from-slate-900 dark:via-[#020617] dark:to-black" />
      
      {/* Vignette Effect to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] opacity-20 dark:opacity-100 transition-opacity duration-500" />

      {/* Floating particles with Parallax */}
      {particles.map((p) => (
        <ParallaxParticle key={p.id} particle={p} mouseX={smoothX} mouseY={smoothY} />
      ))}
    </div>
  );
};

interface ParallaxParticleProps {
  particle: Particle;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const ParallaxParticle: React.FC<ParallaxParticleProps> = ({ particle, mouseX, mouseY }) => {
    // Parallax movement is opposite to mouse and scaled by depth
    const x = useTransform(mouseX, (val: number) => val * particle.depth * -1);
    const y = useTransform(mouseY, (val: number) => val * particle.depth * -1);

    return (
        <motion.div
            style={{ x, y, left: `${particle.x}%`, top: `${particle.y}%` }}
            className="absolute"
        >
             <div 
                className="rounded-full bg-gold-400/50 dark:bg-gold-300 blur-[1px] transition-colors duration-500"
                style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    opacity: particle.opacity,
                    animation: `float ${particle.duration}s ease-in-out infinite`,
                    animationDelay: `${particle.delay}s`
                }}
             />
        </motion.div>
    )
};