"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial mount/loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Subtle background glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] animate-pulse pointer-events-none" />

          {/* Loader Spinner */}
          <div className="relative flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-16 h-16 border-[3px] border-white/5 border-t-white rounded-full"
            />
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute w-2.5 h-2.5 bg-white rounded-full"
            />
          </div>

          {/* Brand Loading Text */}
          <div className="flex flex-col items-center gap-1 font-mono">
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white text-xs font-semibold uppercase tracking-[0.3em] pl-[0.3em]"
            >
              Astrava
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
              className="text-[9px] text-muted-foreground uppercase tracking-widest"
            >
              Configuring pipeline
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
