'use client';

import TextDisperse from '@/app/contact/textDisperse/textDisperse';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ContactForm } from '@/app/contact/contactForm';
import { useToast } from '@/components/ui/use-toast';

export default function Contact() {
  const background = useRef(null);
  const emailRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  const setBackground = (isActive: any) => {
    gsap.to(background.current, { opacity: isActive ? 0.7 : 0 });
  };

  const copyEmail = () => {
    // Fixed the email string to include @
    navigator.clipboard.writeText('hardichittaliya08@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToEmail = () => {
    const emailSection = document.getElementById('email');
    copyEmail();
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="-mt-20 bg-foreground text-white">
      {/* 1. Centered Layout using original Font sizing (8.6vw) */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center pt-44 text-center text-[8.6vw] xs:text-[5.6vw]">

        {/* Name: Single line with original uppercase style, slightly less bold */}
        <div className="flex gap-6 uppercase font-medium leading-[0.9]">
          <p className="m-0">Hardi</p>
          <p className="m-0">Chittaliya</p>
        </div>

        {/* Title: Stacked below name */}
        <div className="flex flex-col items-center uppercase">
          <p className="m-0 text-gray-400">Meteorologist</p>

          {/* Links: Using the original TextDisperse effect */}
          <div className="flex gap-10 mt-4">
            <div
              onClick={() => {
                toast({
                  description: 'Email copied to clipboard!'
                });
                scrollToEmail();
              }}
            >
              <TextDisperse setBackground={setBackground}>
                <p className="m-0 cursor-pointer">→Email</p>
              </TextDisperse>
            </div>

            <Link href={'https://www.linkedin.com/in/hardi08'} target="_blank">
              <TextDisperse setBackground={setBackground}>
                <p className="m-0">→Linkedin</p>
              </TextDisperse>
            </Link>
          </div>
        </div>

        {/* The Disperse Overlay */}
        <div
          ref={background}
          className={clsx(
            'pointer-events-none absolute inset-0 h-full w-full bg-foreground opacity-0'
          )}
        ></div>
      </div>

      {/* 2. Form Section */}
      <div className="px-12 sm:px-56 pb-32" id="email" ref={emailRef}>
        <ContactForm />
      </div>
    </div>
  );
}