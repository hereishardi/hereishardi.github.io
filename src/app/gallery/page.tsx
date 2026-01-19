'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';

// Helper function to handle basePath for GitHub Pages
const getImagePath = (path: string) => {
  // Ensure this matches your GitHub repository name
  const basePath = process.env.NODE_ENV === 'production' ? '/hardichittaliya.com' : '';
  return `${basePath}${path}`;
};

const galleryItems = [
  {
    id: 'dorset-2024',
    title: "Field Trip - Dorset, UK",
    date: "Oct '24", // Fixed: Use literal apostrophe
    description: "Conducted radiosonde launches and recorded meteorological data at multiple field sites.",
    images: [
      '/images/gallery/Dorset_1.jpg',
      '/images/gallery/Dorset_2.jpg',
      '/images/gallery/Dorset_3.jpg',
      '/images/gallery/Dorset_4.jpg'
    ],
    tags: ['Field Work', 'Dorset']
  },
  {
    id: 'ruao-2024',
    title: "Case Study at RUAO - Reading, UK",
    date: "Nov '24", // Fixed
    description: "Calculated surface-layer heat and momentum fluxes using in-situ eddy correlation and mast data for Boundary Layer Module.",
    images: [
      '/images/gallery/RUAO_1.jpg',
      '/images/gallery/RUAO_2.jpg',
      '/images/gallery/RUAO_3.jpg'
    ],
    tags: ['Instrumentation', 'Analysis']
  },
  {
    id: 'thames-2025',
    title: "Thames River Visit - Reading",
    date: "Feb '25", // Fixed
    description: "Hydrological monitoring and river-atmosphere interactions as a part of a coursework for Flood module.",
    images: [
      '/images/gallery/Thames_1.jpg',
      '/images/gallery/Thames_2.jpg',
      '/images/gallery/Thames_3.jpg',
      '/images/gallery/Thames_4.jpg'
    ],
    tags: ['Hydrometeorology']
  },
  {
    id: 'ecmwf-2025',
    title: "ECMWF Visit - Reading",
    date: "Mar '25", // Fixed
    description: "Gained insights into operational flood forecasting and early warning systems, including GloFAS and EFAS.",
    images: [
      '/images/gallery/ECMWF_1.jpg',
      '/images/gallery/ECMWF_2.jpg',
      '/images/gallery/ECMWF_3.jpg',
      '/images/gallery/ECMWF_4.jpg'
    ],
    tags: ['Flood-Forecasting']
  },
  {
    id: 'met-office-2025',
    title: "Met Office Visit - Exeter, UK",
    date: "July '25", // Fixed
    description: "Attended the 10th UK Climate Dynamics Workshop at the Met Office HQ.",
    images: [
      '/images/gallery/Metoffice_1.jpg',
      '/images/gallery/Metoffice_2.jpg',
      '/images/gallery/Metoffice_3.jpg'
    ],
    tags: ['Climate Workshop']
  },
  {
    id: 'uor-met',
    title: "Meteorology Department - University of Reading",
    date: '2024 - 2025',
    description: "Academic life at one of the best uni for atmospheric science.",
    images: [
      '/images/gallery/Met_1.jpg',
      '/images/gallery/Met_2.jpg',
      '/images/gallery/Met_3.jpg',
    ],
    tags: ['Academic', 'UoR']
  },
  {
    id: 'skies-clouds',
    title: "More pretty skies and clouds!!",
    description: "Capturing the beauty of the sky and atmosphere all around!",
    date: "2024 - 2025",
    images: [
      '/images/gallery/Other_1.jpg',
      '/images/gallery/Other_2.jpg',
      '/images/gallery/Other_3.jpg',
      '/images/gallery/Other_4.jpg',
      '/images/gallery/Other_6.jpg',
      '/images/gallery/Other_7.jpg',
      '/images/gallery/Other_8.jpg',
      '/images/gallery/Other_9.jpg'
    ],
    tags: ['Photography', 'Clouds', 'Weather-lover']
  }
];

function HoverCarouselCard({ item }: { item: typeof galleryItems[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSlideshow = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % item.images.length);
    }, 850); // Reverted speed to 850ms
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={stopSlideshow}
      onMouseLeave={startSlideshow}
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <h3 className="text-white text-lg font-semibold">{item.title}</h3>
      </div>
      <Image
        src={getImagePath(item.images[currentIndex])}
        alt={item.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-700 ease-in-out transform hover:scale-105"
      />
    </div>
  );
}

export default function Gallery() {
  return (
    <Layout>
      <div className="py-10">
        <h2 className="text-4xl font-extrabold text-center mb-8">
          My Gallery
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
              <HoverCarouselCard item={item} />
              <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out transform scale-95 group-hover:scale-100">
                <h3 className="text-white text-lg font-semibold text-center">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}