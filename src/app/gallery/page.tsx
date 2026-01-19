'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/components/layout';
import { getImagePath } from '@/utils/imagePath'; // Uses your central utility

// Keep your galleryItems exactly as you had them
const galleryItems = [
  {
    id: 'dorset-2024',
    title: "Field Trip - Dorset, UK",
    date: "Oct '24",
    description: "Conducted radiosonde launches and recorded meteorological data at multiple field sites.",
    images: [
      '/images/gallery/Dorset_1.jpg',
      '/images/gallery/Dorset_2.jpg',
      '/images/gallery/Dorset_3.jpg',
      '/images/gallery/Dorset_4.jpg'
    ],
    tags: ['Field Work', 'Dorset']
  },
  // ... other items remain the same
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
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % item.images.length);
      }, 1200); // Smooth transition speed
    }
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start slideshow automatically when component loads
  useEffect(() => {
    startSlideshow();
    return () => stopSlideshow();
  }, []);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={stopSlideshow}
      onMouseLeave={startSlideshow}
    >
      <Image
        src={getImagePath(item.images[currentIndex])}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-opacity duration-500"
      />
    </div>
  );
}

export default function Gallery() {
  return (
    <Layout title="Gallery">
      <div className="py-20 bg-foreground min-h-screen text-white">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Meteorological Fieldwork & Gallery
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl overflow-hidden shadow-2xl bg-zinc-900 h-[350px] sm:h-[450px]"
            >
              <HoverCarouselCard item={item} />

              {/* Animated Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-bold text-yellow-400">{item.title}</h3>
                <p className="text-sm text-zinc-300 mt-3 line-clamp-3">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs font-mono text-zinc-500">{item.date}</span>
                  <div className="flex gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-white/10 px-2 py-1 rounded text-zinc-400 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}