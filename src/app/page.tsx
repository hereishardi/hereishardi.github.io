'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight } from 'lucide-react';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';
import { LetterCollision } from '@/components/animations/textAnimations/scrollText';
import Magnetic from '@/components/animations/magnetic';
import Hero from '@/components/home/hero';
import Description from '@/components/home/Description/description';

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(true);
  const scrollContainerRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Safety check for window to prevent build errors
      if (typeof window !== 'undefined' && window.scrollY > 0) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollContainerRef} className="overflow-x-hidden">
      {/* 1. Hero Animation Section */}
      <LetterCollision />

      {/* 2. Scroll Indicator */}
      {showScrollButton && (
        <Magnetic>
          <div
            className="fixed bottom-4 right-8 flex cursor-pointer items-center space-x-2 text-3xl font-semibold sm:bottom-8 z-50"
            onClick={scrollToHero}
          >
            <p>Scroll</p>
            <ArrowDownRight strokeWidth={3} className="size-6" />
          </div>
        </Magnetic>
      )}

      {/* 3. Content Sections */}
      <div id="hero" ref={heroRef}>
        <Hero />
      </div>

      <Description />

      {/* SlidingImages was here; it has been removed to fix the build errors */}

      <ContrastCursor isActive={false} text={'Go to project'} />
    </div>
  );
}