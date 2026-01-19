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

  // Function to start the automatic rotation
  const startSlideshow = () => {
    // Only start if an interval isn't already running
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % item.images.length);
      }, 1200); // Speed increased: Changed from 2000 to 1200ms for better flow
    }
  };

  // Function to clear the rotation
  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Mobile & Auto-Play logic: Starts immediately on mount
  // This solves the "no cursor on phone" issue
  React.useEffect(() => {
    startSlideshow();
    return () => stopSlideshow(); // Cleanup on unmount
  }, []);

  return (
    <div
      // On desktop: pauses on hover so user can read/view, resumes when leaving
      onMouseEnter={stopSlideshow}
      onMouseLeave={startSlideshow}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={getImagePath(item.images[currentIndex])}
          alt={item.title}
          fill
          className="object-cover transition-opacity duration-500" // Smoother fade
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={currentIndex === 0}
        />
        {/* Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300 z-10"
          style={{ width: `${((currentIndex + 1) / item.images.length) * 100}%` }}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{item.title}</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase">{item.date}</span>
        </div>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[9px] bg-blue-50 text-blue-600 rounded-full font-bold uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <Layout title="Gallery">
      <div className="min-h-screen bg-[#FAFAFA] px-4 py-16 md:px-8 lg:px-16">
        <div className="mb-20 text-center">
          <p className="text-xl font-medium text-blue-600/60">
            Where I&apos;ve been to so far!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <HoverCarouselCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </Layout>
  );
}