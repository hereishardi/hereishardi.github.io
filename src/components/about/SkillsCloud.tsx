'use client';
import React, { useEffect, useRef } from 'react';
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
  { name: 'Climate Data Interpretation', category: 'data' },
  { name: 'Atmospheric Composition Analysis', category: 'data' },
  { name: 'Statistical Data Analysis', category: 'data' },

  // Modelling & Research
  { name: 'Weather and Climate Models (WRF, OpenIFS)', category: 'modelling' },
  { name: 'Reanalysis Datasets (ERA5, GloFAS)', category: 'modelling' },

  // Programming & Technical
  { name: 'Python', category: 'technical' },
  { name: 'R', category: 'technical' },
  { name: 'Geospatial Visualisation (QGIS, Google Earth)', category: 'technical' },
  { name: 'Webpage Creation & Development', category: 'technical' },

  // Scientific Tools
  { name: 'LaTeX', category: 'tools' },
  { name: 'MS Office', category: 'tools' },
  { name: 'Mendeley', category: 'tools' },

  // Professional
  { name: 'Effective Communication', category: 'professional' },
  { name: 'Scientific Writing and Reporting', category: 'professional' },
  { name: 'Teamwork', category: 'professional' },
  { name: 'Adaptability to different time zones', category: 'professional' },
  { name: 'Time Management', category: 'professional' },
];

const categoryColors: Record<string, string> = {
  data: 'bg-blue-600/15 text-blue-800 border-blue-600/30 hover:bg-blue-600/25',
  modelling: 'bg-violet-600/15 text-violet-800 border-violet-600/30 hover:bg-violet-600/25',
  technical: 'bg-emerald-600/15 text-emerald-800 border-emerald-600/30 hover:bg-emerald-600/25',
  tools: 'bg-slate-600/15 text-slate-800 border-slate-600/30 hover:bg-slate-600/25',
  professional: 'bg-amber-600/15 text-amber-800 border-amber-600/30 hover:bg-amber-600/25'
};

export default function SkillsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const skillElements = skillsRef.current;

    if (!container || !skillElements.length) return;

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

      {/* Row 2: Professional Skills */}
      <div className="flex flex-wrap justify-center gap-3">
        {skills
          .filter((s) => s.category === 'professional')
          .map((skill, i) => (
            <Magnetic key={skill.name}>
              <div
                ref={(el) => {
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