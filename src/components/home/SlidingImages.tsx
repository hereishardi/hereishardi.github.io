'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';
import { getImagePath } from '@/utils/imagePath';

// Define the structure of your data
interface SliderItem {
  color: string;
  src: string;
}

interface SlidingImagesProps {
  slider1: SliderItem[];
  slider2: SliderItem[];
}

export default function SlidingImages({ slider1, slider2 }: SlidingImagesProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div ref={container} className="relative z-10 flex flex-col gap-[3vw] bg-white py-20">
      <motion.div style={{ x: x1 }} className="flex w-[120vw] gap-[3vw] -left-[10vw] relative">
        {slider1?.map((project, index) => (
          <div
            key={index}
            className="flex h-[20vw] w-[25vw] items-center justify-center rounded-xl"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative h-[80%] w-[80%]">
              <Image
                fill={true}
                alt={'image'}
                src={getImagePath(`/images/${project.src}`)}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div style={{ x: x2 }} className="flex w-[120vw] gap-[3vw] -left-[10vw] relative">
        {slider2?.map((project, index) => (
          <div
            key={index}
            className="flex h-[20vw] w-[25vw] items-center justify-center rounded-xl"
            style={{ backgroundColor: project.color }}
          >
            <div className="relative h-[80%] w-[80%]">
              <Image
                fill={true}
                alt={'image'}
                src={getImagePath(`/images/${project.src}`)}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}