'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const word1 = 'Precision ';
const word2 = 'in Data ';
const word3 = 'Clarity in ';
const word4 = 'Forecasting';

export function LetterCollision() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('.letter');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          // 1. Reduced scroll distance from 150% to 80% to cut vertical gap
          end: "+=70%",
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      tl.to(letters, {
        x: () => (Math.random() - 0.5) * 600,
        y: () => -600 - Math.random() * 300,
        rotation: () => (Math.random() - 0.5) * 180,
        opacity: 0,
        stagger: 0.005, // 2. Faster stagger for a snappier feel
        ease: "power2.in"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // 3. Changed min-h-[150vh] to h-screen to remove excess bottom padding
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60 z-0"
      >
        <source src="/images/gallery/video_clouds.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-8 md:px-20 text-white pointer-events-none">
        <div className="flex flex-wrap">
          <LetterDisplay word={word1} />
          <LetterDisplay word={word2} />
        </div>
        <div className="flex flex-wrap">
          <LetterDisplay word={word3} />
          <LetterDisplay word={word4} />
        </div>
      </div>
    </section>
  );
}

function LetterDisplay({ word }: { word: string }) {
  return word.split('').map((letter, index) => (
    <span
      key={index}
      className="letter inline-block text-5xl font-bold xs:text-7xl md:text-8xl lg:text-9xl xl:text-[130px] leading-tight"
    >
      {letter === ' ' ? '\u00A0' : letter}
    </span>
  ));
}