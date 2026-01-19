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
    if