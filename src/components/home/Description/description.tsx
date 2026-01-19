import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { opacity, slideUp } from './anim';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';

export default function Description() {
  const phrase1 =
    'A meteorologist transforming complex atmospheric data into decision-ready insights for climate resilience and operational services.';

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
      className="relative flex flex-col justify-center gap-12 p-8 sm:mt-[200px] sm:flex-row sm:p-20"
    >
      {/* Left Section: Main Phrases */}
      <div className="space-y-8 sm:w-[60%]">
        <p className="m-0 leading-tight sm:text-4xl">
          {phrase1.split(' ').map((word, index) => (
            <span key={index} className="relative mr-1.5 inline-flex overflow-hidden">
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
        <p className="m-0 leading-snug sm:text-2xl opacity-80">
          {phrase2.split(' ').map((word, index) => (
            <span key={index} className="relative mr-1.5 inline-flex overflow-hidden">
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

      {/* Right Section: Detailed Bio + Button */}
      <div className="relative flex flex-col justify-between sm:w-[35%]">
        <div>
          <motion.p
            variants={opacity}
            animate={isInView ? 'open' : 'closed'}
            className="m-0 pb-6 font-medium sm:text-2xl"
          >
            Recent MSc graduate from the University of Reading.
          </motion.p>
          <motion.p
            variants={opacity}
            animate={isInView ? 'open' : 'closed'}
            className="m-0 text-lg font-light leading-relaxed"
          >
            My technical expertise lies in the development of Python-based frameworks for automated data quality control, time-series analysis, and geospatial visualisation.
          </motion.p>
        </div>

        {/* Orange Button */}
        <div className="mt-16 flex justify-start items-center">
          <Link href={'/about'}>
            <button className="flex h-[120px] w-[120px] cursor-pointer items-center justify-center rounded-full bg-[#f97316] text-white sm:h-[160px] sm:w-[160px] hover:bg-[#ea580c] transition-all shadow-xl font-bold">
              About me
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}