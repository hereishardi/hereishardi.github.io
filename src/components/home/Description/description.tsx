import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';

export default function Description() {
  const phrase1 =
    'A meteorologist transforming complex atmospheric data into decision-ready insights for climate resilience and operational services.\n\n ';

  const phrase2 =
    'Passionate about advancing our capacity to monitor and model the atmosphere ' +
    'at the intersection of physical science and modern tech. Whether contributing ' +
    'to AI-driven atmospheric projects, climate research, or operational services. ' +
    'I am dedicated to building the advanced tools that enhance the accuracy, ' +
    'reliability, and impact of weather data for a resilient future.';
  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div
      ref={description}
      className="relative flex flex-col justify-center gap-12 p-8 sm:mt-[200px] sm:flex-row sm:p-20 "
    >
      <div className="space-y-4">
        <p className="m-0 gap-2 leading-snug sm:text-4xl">
          {phrase1.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <p className="m-0 gap-2 leading-snug sm:text-2xl">
          {phrase2.split(' ').map((word, index) => (
            <span
              key={index}
              className="relative mr-1.5 inline-flex overflow-hidden"
            >
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
      <div className="relative">
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 pb-3 font-light sm:text-2xl"
        >
          Recent MSc graduate from the University of Reading.
        </motion.p>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className="m-0 text-lg font-light mb-32 sm:mb-0"
        >
          My technical expertise lies in the development of Python-based frameworks for automated data quality control, time-series analysis, and geospatial visualisation. I have extensive experience managing complex observational weather networks and performing high-resolution atmospheric modeling to provide actionable insights for urban and regional climate resilience.
        </motion.p>
        <div data-scroll-speed={0.1} className="relative flex justify-center items-center">
          <Link href={'/about'}>
            <RoundedButton className="flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-full bg-destructive text-white sm:h-[150px] sm:w-[150px] focus:outline-none focus:ring-4 focus:ring-destructive/50">
              About me
            </RoundedButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
