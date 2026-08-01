'use client';

import React from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import SkillsCloud from '@/components/about/SkillsCloud';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';

export default function About(): React.JSX.Element {
  return (
    <div className="relative overflow-hidden">
      <Layout title="About Me" center>
        <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <section className="grid gap-8 py-6 md:gap-12 lg:grid-cols-5 lg:gap-16">
            <AnimatedSection
              animation="fade-right"
              className="lg:sticky lg:top-32 lg:col-span-2 lg:self-start"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl">
                <Image
                  src="/images/IMG_9614.jpg"
                  alt="Hardi"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                />
              </div>
            </AnimatedSection>

            <div className="space-y-8 lg:col-span-3">
              <AnimatedSection animation="fade-up">
                <TextReveal
                  text=" A Meteorologist and Climate Scientist, with a background in Physics. I turned my childhood obsession with observing clouds and watching sunsets into a weather and climate expert."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Vision
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    My journey began with a fascination for the complex systems of the sky. Today, I apply that same curiosity to transform atmospheric and climate observations into insights that support accurate forecasting and climate-resilient decisions, and to help coordinate the international research that makes them possible.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Beyond Weather
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    I love to run and read. I spend my free time reading about neuroscience and psychology to understand the systems that govern our mind just as I study the systems that govern our skies. I also write on Substack (link given below).
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* Education Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="rounded-2xl border border-foreground/5 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
                  Education
                </h2>
                <div className="space-y-4 text-foreground/70">
                  <p>
                    <span className="font-semibold text-foreground">MSc in Applied Meteorology and Climate - University of Reading</span>
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Selected Modules: </span>
                    Fundamentals of Weather and Climate, Data Analysis for Climate and Forecasting Systems, Synoptic and Boundary Layer Meteorology, Remote Sensing, Extreme Weather and Flood Risk
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">Dissertation: </span>
                    Analysis of Canopy Layer Urban Heat Island (CL-UHI) Intensity in Berlin
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">BSc in Physics - Gujarat University</span>
                  </p>
                  
                  <p>
                    <span className="font-semibold text-foreground">Selected Modules: </span>
                    Classical and Quantum Mechanics, Mathematical Physics, Electromagnetism, Solid State Physics and Nuclear Physics
                  </p>
                  <p>
                    
                    </p>
                </div>
              </div>
            </AnimatedSection>
          </section>
                  

          {/* Journey Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Professional Experience
                </h2>
              </div>
              <JourneyTimeline />
            </AnimatedSection>
          </section>

          {/* Skills Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Technical & Professional Skills
                </h2>
              </div>
              <SkillsCloud />
            </AnimatedSection>
          </section>

        </div>
      </Layout>

      <ContrastCursor isActive={false} text="" />
    </div>
  );
}