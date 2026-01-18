'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Helper function to handle basePath
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/hardichittaliya.com' : '';
  return `${basePath}${path}`;
};

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Climate Strip Image */}
      <Image
        src={getImagePath("/images/gallery/Climate_Strip.png")}
        alt="Climate Warming Stripes"
        fill
        className="object-cover opacity-100 brightness-120"
        priority
        unoptimized
      />

      {/* Main Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-10 bg-black/20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >

        </motion.div>
      </div>

      {/* Credit Section - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 z-20 text-right text-white/70 max-w-xs md:max-w-md"
      >
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] leading-loose">
          Climate Strip by - <span className="text-white font-bold">Professor Ed Hawkins</span> <br />
          University of Reading
        </p>
      </motion.div>
    </div>
  );
}