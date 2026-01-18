'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const certificationsData = [
    { title: 'Training Course on Calibration', issuer: ' By World Meteorological Organization', date: 'Dec 2025' },
    { title: 'Integrated Drought Management: Monitoring and Early Warning', issuer: 'By Cap-Net', date: 'Nov 2025' },
    { title: 'Numerical Weather Prediction: Hands on WRF Modelling', issuer: 'By CSEE- Center For Sustainable Environmentand Education', date: 'Oct 2025' },
    { title: 'Forecasting Module', issuer: 'By Met Office', date: 'Jun 2025' },
    { title: 'Machine Learning Using Python Programming', issuer: 'By M. G. Science Institute', date: 'May 2024' },
    { title: 'Data Analysis Using Python Programming', issuer: 'By M. G. Science Institute', date: 'May 2024' },
    { title: 'Basics of Python Programming', issuer: 'By M. G. Science Institute', date: 'May 2024' },
];

export default function CertificationsTimeline() {
    // Using a Map prevents the "itemsRef.current[i]" error
    const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());

    useEffect(() => {
        const elements = Array.from(itemsRef.current.values());

        elements.forEach((el) => {
            gsap.fromTo(el,
                { opacity: 0, x: -15 },
                {
                    opacity: 1, x: 0, duration: 0.6,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, []);

    return (
        <div className="relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-blue-100" />
            <div className="space-y-12">
                {certificationsData.map((cert, i) => (
                    <div
                        key={i}
                        ref={(el) => {
                            if (el) itemsRef.current.set(i, el);
                            else itemsRef.current.delete(i);
                        }}
                        className="relative flex items-start gap-6"
                    >
                        <div className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-4 border-white bg-blue-500 shadow-sm" />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded w-fit mb-2">
                                {cert.date}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">{cert.title}</h3>
                            <p className="text-sm font-medium text-gray-500 mt-1">{cert.issuer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}