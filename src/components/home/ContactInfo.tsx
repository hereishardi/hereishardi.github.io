'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Magnetic from '@/components/animations/magnetic';
import RoundedButton from '@/components/animations/roundedButton';
import Link from 'next/link';
import { getImagePath } from '@/utils/imagePath';

interface CityWeather {
  name: string;
  temp: number;
  description: string;
}

export default function ContactInfo() {
  const [weatherData, setWeatherData] = useState<CityWeather[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const cities = [
          { name: 'New York', lat: 40.7128, lon: -74.0060 },
          { name: 'London', lat: 51.5074, lon: -0.1278 },
          { name: 'Delhi', lat: 28.6139, lon: 77.2090 }
        ];

        const results = await Promise.all(cities.map(async (city) => {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
          const data = await res.json();

          const descriptions: { [key: number]: string } = {
            0: 'Clear', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast', 45: 'Fog', 61: 'Rainy'
          };

          return {
            name: city.name,
            temp: Math.round(data.current_weather.temperature),
            description: descriptions[data.current_weather.weathercode] || 'Clear'
          };
        }));

        setWeatherData(results);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };
    fetchWeather();
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  const animatedUnderlineStyle =
    'relative after:absolute after:left-1/2 after:mt-0.5 after:block after:h-px after:w-0' +
    ' after:-translate-x-1/2 after:transform after:bg-white after:duration-200 ' +
    "after:ease-linear after:content-[''] hover:after:w-full";

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className="relative flex min-h-screen flex-col items-center justify-between bg-foreground p-6 pt-32 text-white sm:justify-center overflow-hidden"
    >
      <div className="w-full bg-foreground pt-[150px] sm:max-w-[1800px] z-10">
        <div className="relative border-b border-gray-600 pb-12 sm:mx-[100px]">
          <span className="flex items-center">
            <div className="relative h-16 w-16 overflow-hidden rounded-full sm:h-[100px] sm:w-[100px] border border-white/10 bg-white">
              <Image
                fill
                alt={'logo'}
                src={getImagePath('/images/logo.png')}
                priority
                className="object-cover scale-125"  // CHANGED FROM object-contain
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="ml-3 text-xl font-medium sm:text-[5vh]">
              Let&apos;s connect!
            </h2>
          </span>

          <motion.div
            style={{ x }}
            className="absolute left-[calc(100%-200px)] top-[calc(100%+65px)] sm:left-[calc(100%-400px)] sm:top-[calc(100%-75px)]"
          >
            <RoundedButton
              backgroundColor="secondary"
              className="absolute h-[100px] w-[100px] cursor-pointer items-center justify-center rounded-full bg-primary p-0 text-white sm:h-[200px] sm:w-[200px]"
            >
              <Link href={'/contact'}>Get in touch</Link>
            </RoundedButton>
          </motion.div>
        </div>

        <div className="mt-6 flex gap-5 sm:mx-[100px]">
          <RoundedButton>hardichittaliya08@gmail.com</RoundedButton>
        </div>

        <div className="mt-20 flex flex-col justify-between p-5 2xs:mt-52 sm:mx-[100px] sm:mt-48 sm:flex-row items-start">
          <div className="flex flex-col gap-2 mb-10 sm:max-w-md">
            <p className="text-base font-medium">
              Meteorologist | Climate Researcher | Atmospheric Data Specialist
            </p>
            <p className="text-sm opacity-70">
              Passionate about merging atmospheric science with cutting-edge tech to
              provide solutions that address our changing climate and create a
              more sustainable world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-12 mb-10 sm:mb-0">
            <span className="flex flex-col gap-3">
              <h3 className="m-0 cursor-default p-1 text-xs uppercase tracking-widest text-gray-500">
                Version
              </h3>
              <p className="relative m-0 p-1 text-sm">2026 © Edition</p>
            </span>

            <span className="flex flex-col gap-3 min-w-[200px]">
              <h3 className="m-0 cursor-default p-1 text-xs uppercase tracking-widest text-gray-500 border-b border-white/10">
                Live Weather Updates
              </h3>
              <div className="flex flex-col gap-2 p-1">
                {weatherData.length > 0 ? (
                  weatherData.map((city) => (
                    <div key={city.name} className="flex justify-between items-center gap-4">
                      <p className="text-sm font-light text-gray-400">{city.name}</p>
                      <div className="flex gap-2 items-baseline">
                        <p className="font-medium text-sm">{city.temp}°C</p>
                        <p className="text-[10px] text-gray-500 italic lowercase">{city.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 italic">Analysing global data...</p>
                )}
              </div>
            </span>

            <span className="flex flex-col gap-3">
              <h3 className="m-0 cursor-default text-xs uppercase tracking-widest text-gray-500">
                Socials
              </h3>
              <div className="flex gap-4 p-1">
                <Magnetic>
                  <Link href="https://github.com/hereishardi" className={animatedUnderlineStyle}>Github</Link>
                </Magnetic>
                <Magnetic>
                  <Link href="https://www.linkedin.com/in/hardi08" className={animatedUnderlineStyle}>Linkedin</Link>
                </Magnetic>
              </div>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}