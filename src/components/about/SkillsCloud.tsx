'use client';
import React, { useEffect, useRef } from 'react'; // Add React here
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/animations/magnetic';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'data' | 'modelling' | 'technical' | 'tools' | 'professional';
}

const skills: Skill[] = [
  // Atmospheric Data & Analysis
  { name: 'Meteorological Data Analysis', category: 'data' },
  { name: 'Statistical Data Analysis', category: 'data' },
  { name: 'Climate Data Interpretation', category: 'data' },
  { name: 'Synoptic & Model Chart Interpretation', category: 'data' },

  // Modelling & Research
  { name: 'Weather and Climate Models (WRF, OpenIFS)', category: 'modelling' },
  { name: 'Reanalysis of Data (ERA5, GloFAS)', category: 'modelling' },

  // Programming & Technical
  { name: 'Python', category: 'technical' },
  { name: 'Matlab', category: 'technical' },
  { name: 'SQL', category: 'technical' },
  { name: 'QGIS', category: 'technical' },
  { name: 'Linux', category: 'technical' },

  // Scientific Tools
  { name: 'LaTeX', category: 'tools' },
  { name: 'MS Office', category: 'tools' },
  { name: 'Mendeley', category: 'tools' },

  // Professional
  { name: 'Problem Solving', category: 'professional' },
  { name: 'Effective Communication', category: 'professional' },
  { name: 'Teamwork', category: 'professional' },
  { name: 'Adaptability', category: 'professional' },
  { name: 'Time Management', category: 'professional' }
];

const categoryColors: Record<string, string> = {
  data: 'bg-blue-600/15 text-blue-800 border-blue-600/30 hover:bg-blue-600/25', // Atmospheric/Oceanic Blue
  modelling: 'bg-indigo-600/15 text-indigo-800 border-indigo-600/30 hover:bg-indigo-600/25', // Deep Science Indigo
  technical: 'bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25', // Technical Green
  tools: 'bg-slate-600/15 text-slate-800 border-slate-600/30 hover:bg-slate-600/25', // Tool Gray
  professional: 'bg-amber-600/15 text-amber-800 border-amber-600/30 hover:bg-amber-600/25' // Warm Amber
};

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const skillElements = skillsRef.current;

    if (!container || !skillElements.length) return;

    // Staggered reveal animation
    gsap.fromTo(
      skillElements,
      {
        opacity: 0,
        scale: 0.5,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.5)',
        stagger: {
          each: 0.05,
          from: 'random'
        },
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      {/* Row 1: Technical Skills */}
      <div className="flex flex-wrap justify-center gap-3">
        {skills
          .filter((s) => s.category !== 'professional')
          .map((skill, i) => (
            <Magnetic key={skill.name}>
              <div
                ref={(el) => { if (el) skillsRef.current[i] = el; }}
                className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base ${categoryColors[skill.category]}`}
              >
                {skill.name}
              </div>
            </Magnetic>
          ))}
      </div>

      {/* Row 2: Professional Skills (New Line with NO extra gaps) */}
      <div className="flex flex-wrap justify-center gap-3">
        {skills
          .filter((s) => s.category === 'professional')
          .map((skill, i) => (
            <Magnetic key={skill.name}>
              <div
                ref={(el) => {
                  // Keep the index continuous for GSAP animations
                  const index = skills.filter((s) => s.category !== 'professional').length + i;
                  if (el) skillsRef.current[index] = el;
                }}
                className={`cursor-default rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 md:px-6 md:py-3 md:text-base ${categoryColors[skill.category]}`}
              >
                {skill.name}
              </div>
            </Magnetic>
          ))}
      </div>
    </div>
  );
}
