'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSpotify } from '@/hooks/useSpotify';
import { useGitHub } from '@/hooks/useGithub';
import Layout from '@/components/layout';
import AnimatedSection from '@/components/about/AnimatedSection';
import TextReveal from '@/components/about/TextReveal';
import JourneyTimeline from '@/components/about/JourneyTimeline';
import SkillsCloud from '@/components/about/SkillsCloud';
import GitHubContributionsGraph from '@/app/about/githubActivity';
import SpotifyPlaylists from '@/app/about/spotifyPlaylists';
import ContrastCursor from '@/components/animations/cursor/contrastCursor';

export default function About() {
  const {
    playlists,
    isLoading: spotifyLoading,
    error: spotifyError
  } = useSpotify();

  const {
    githubData,
    isLoading: githubLoading,
    error: githubError
  } = useGitHub();

  return (
    <div className="relative overflow-hidden">
      <Layout title="About Me" center>
        <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
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
                  text="A Meteorologist with a background in Physics. I turned my childhood obsession with observing clouds and sunsets into a career as a weather expert."
                  className="text-xl font-medium leading-relaxed text-foreground/90 sm:text-2xl"
                  as="p"
                  highlightWords={['design', 'human']}
                  scrub={false}
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.1}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    My Vision
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    My journey began with a fascination for the complex systems of the sky. Today, I apply that same curiosity to transform atmospheric and climate observations into actionable insights for a resilient future.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={0.2}>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Beyond Weather
                  </h3>
                  <p className="leading-relaxed text-foreground/70">
                    Outside of Meteorology, I love to run and read - I spend my free time exploring & reading about neuroscience and psychology to understand the systems that govern our mind just as I study the systems that govern our skies.
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

                {/* MSc Section */}
                <p className="mb-6 text-foreground/70">
                  At{' '}
                  <span className="font-semibold text-foreground">
                    University of Reading
                  </span>
                  , I completed an <span className="font-semibold text-foreground">MSc in Applied Meteorology and Climate</span>, a world-leading program that bridged advanced physical theory with practical forecasting systems. My training focused on analysing meteorological data, from studying Synoptic & Boundary Layer Meteorology and Extreme Weather to Remote Sensing and Flood Risk.
                  <br /><br />
                  For my dissertation, I performed a high-resolution analysis of Canopy Layer Urban Heat Island (CL-UHI) intensity in Berlin, utilising reanalysis datasets to provide insights into urban climate resilience.
                  <br /><br />
                  Previously, I earned my <span className="font-semibold text-foreground">BSc in Physics</span>, which provided the foundational training in mathematical modeling, thermodynamics, and fluid dynamics necessary for complex atmospheric research.
                  <br /><br />
                  This combination of physics and meteorology has equipped me with a unique skill set to tackle the challenges of modern weather and climate science.
                </p>
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
            </AnimatedSection>
            <JourneyTimeline />
          </section>

          {/* Skills Section */}
          <section className="py-16">
            <AnimatedSection animation="fade-up">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                  Technical & Professional Skills
                </h2>
              </div>
            </AnimatedSection>
            <SkillsCloud />
          </section>

          {/* GitHub Activity Section */}
          {!githubLoading && !githubError && githubData && (
            <section className="py-16">
              <AnimatedSection animation="fade-up">
                <Link
                  href="https://github.com/hereishardi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-[1.01]"
                >
                  <GitHubContributionsGraph
                    contributions={githubData.contributions}
                    totalContributions={githubData.totalContributions}
                    restrictedContributions={githubData.restrictedContributions}
                  />
                </Link>
              </AnimatedSection>
            </section>
          )}

          {/* Spotify Section */}
          {!spotifyLoading && !spotifyError && playlists.length > 0 && (
            <section className="py-16">
              <AnimatedSection animation="fade-up">
                <SpotifyPlaylists playlists={playlists} />
              </AnimatedSection>
            </section>
          )}
        </div>
      </Layout>

      <ContrastCursor isActive={false} text="" />
    </div>
  );
}
