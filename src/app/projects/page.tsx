'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout';
import Image from 'next/image';
import { getImagePath } from '@/utils/imagePath';

const myProjects = [
  {
    title: 'Dissertation: Analysis of Canopy Layer Urban Heat Island (CL-UHI) Intensity in Berlin (Supervisor: Russell Glazer and Sue Grimmond)',
    description: `I investigated Berlin's Canopy Layer Urban Heat Island (CL-UHI) intensity using a case study from the Urbisphere and multi-network observational datasets from 25+ weather stations. By implementing Python-based statistical analysis and geospatial visualisation, I quantified urban-rural temperature differences and diurnal variability. My findings successfully identified the significant cooling influence of site-specific characteristics like urban green spaces, providing critical evidence for improving city-scale climate resilience.`,
    tag: 'Research Project',
    images: ['/images/gallery/Diss_1.png', '/images/gallery/Diss_2.png', '/images/gallery/Diss_3.png'],
  },
  {
    title: 'Multi-Sensor Atmospheric Monitoring & Quantitative Retrieval',
    description: `I demonstrated technical proficiency in processing complex meteorological datasets by developing a Python-based script to analyse extreme convective event. Utilising matrix algebra and maximum a posteriori probability solutions, I successfully performed a joint retrieval of temperature and humidity profiles across 124 pressure levels from hyperspectral infrared data. I validated these results through a qualitative and quantitative analysis of multi-channel satellite data, effectively mapping the lifecycle of intense thunderstorms.`,
    tag: 'GIS & Physical Analysis',
    images: ['/images/gallery/RS_1.jpg', '/images/gallery/RS_2.jpg'],
  },
  {
    title: 'Ensemble Hydrograph Analysis & Humanitarian Risk Assessment',
    description: `I acted as a Flood Forecaster to provide critical decision support for Red Cross emergency response teams during a simulated extreme flooding event in the Burdekin River, Australia. By analysing GloFAS ensemble hydrographs and ECMWF-ENS forecasts, I quantified uncertainty and identified "High" to "Severe" flood threshold breaches with a 10-day lead time. This project demonstrated my ability to bridge the gap between complex hydrological modeling and humanitarian disaster risk reduction (DRR) while demonstrating effective meteorological communication.`,
    tag: 'Flood-risk & Crisis Management',
    images: ['/images/gallery/Flood_1.png', '/images/gallery/Flood_2.png', '/images/gallery/Flood_3.png'],
  },
  {
    title: 'Analysis of Mesoscale Instabilities in Extra-Tropical Cyclones',
    description: `I performed a detailed synoptic reconstruction of "Cyclone Friedhelm," an explosive mid-latitude system, to identify the formation of 'Sting Jets' and high-momentum air streams. Using Met Office model charts, I analysed theta-w gradients and baroclinic zones to map the transition from frontal fracture to cloud head development. By evaluating descent-driven momentum transfer, I identified the drivers of severe surface damage, showcasing my ability to interpret complex physical processes.`,
    tag: ['Tropical Cyclones & Extreme Weather Analysis'],
    images: ['/images/gallery/MTMTEA_1.png'],
  },
  {
    title: 'Met Office: Forecasting Module',
    description: 'Delivered weather briefings to diverse communities, translating complex synoptic charts and numerical model data into actionable insights.',
    tag: ['Operational Forecasting', 'Meteorological Communication'],
    images: ['/images/gallery/Met_4.jpg'],
  },
];

export default function MyNewProjectsPage() {
  const [imgIndex, setImgIndex] = useState(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeProjectIndex !== null) {
      const imagesCount = myProjects[activeProjectIndex].images.length;
      if (imagesCount > 1) {
        interval = setInterval(() => {
          setImgIndex((prev) => (prev + 1) % imagesCount);
        }, 1200);
      }
    } else {
      setImgIndex(0);
    }
    return () => clearInterval(interval);
  }, [activeProjectIndex]);

  return (
    <Layout title="Projects">
      <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16">
            <h1 className="text-6xl font-black uppercase tracking-tighter">My Work</h1>
            <p className="text-gray-500 mt-4 text-xl">Research and coursework</p>
          </header>

          <div className="grid grid-cols-1 gap-24">
            {myProjects.map((project, index) => (
              <div
                key={index}
                className="group flex flex-col md:flex-row gap-12 items-start"
                onMouseEnter={() => setActiveProjectIndex(index)}
                onMouseLeave={() => setActiveProjectIndex(null)}
              >
                {/* Image Container */}
                <div className="w-full md:w-1/2 aspect-video bg-gray-100 relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <Image
                    src={getImagePath(activeProjectIndex === index ? project.images[imgIndex] : project.images[0])}
                    alt={project.title}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                    unoptimized
                  />
                </div>

                {/* Content Container */}
                <div className="w-full md:w-1/2">
                  <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
                    {project.tag}
                  </span>
                  <h2 className="text-2xl font-black uppercase mt-2 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h2>
                  <div className="w-12 h-1 bg-blue-600 mb-6"></div>
                  <p className="text-gray-600 text-lg leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}