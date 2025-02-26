"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import React from "react";

export const MainMenu = ({ items }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`px-5 h-[97px] sticky top-0 z-20 flex transition-colors duration-300 ${isScrolled ? 'bg-[#E2F1E7]' : 'bg-transparent'}`}>
      <div className='w-[280px] mt-2'>
        <h1>Logo</h1>
      </div>
      <div className="flex flex-1 justify-center mt-4">
        {isMobile ? (
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-5 text-[#387478] hover:text-[#629584]">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        ) : (
          (items || []).map((item) => (
            <div key={item.id} className="cursor-pointer relative group">
              <a href={item.destination} className={`p-5 block transition-colors duration-300 ${pathname === item.destination ? 'text-teal-500' : 'text-[#387478]'} hover:text-[#629584]`}>
                {item.label}
              </a>
            </div>
          ))
        )}
      </div>
      {!isMobile && (
        <div className="my-auto flex">
          <a href='#'>
            Appelez-nous +212 6 66 67 16 07
          </a>
        </div>
      )}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#E2F1E7] z-30 flex flex-col items-center justify-center text-center p-10">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-5 right-5">
            <X size={40} className="text-[#387478]" />
          </button>
          <nav className="space-y-6 w-full max-w-md">
            {(items || []).map((item, index) => (
              <React.Fragment key={item.id}>
                <a href={item.destination} className="text-2xl font-bold text-[#387478] hover:text-[#629584] block" onClick={() => setIsMenuOpen(false)}>
                  {item.label}
                </a>
                {index < items.length - 1 && <hr className="border-t border-gray-300 my-2" />}
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};