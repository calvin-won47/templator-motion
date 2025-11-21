
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../contexts/ConfigContext';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-brand-gray-light hover:text-white transition-colors text-base">
    {children}
  </a>
);

const MotionLogo = () => {
  const cfg = useConfig();
  const name = cfg?.basic?.app_name || 'motion';
  return (
    <a href="/" className="text-2xl font-bold flex items-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M16 0L32 16L16 32L0 16L16 0Z" fill="url(#paint0_linear_1_2)"/>
        <defs>
          <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A259FF"/>
            <stop offset="1" stopColor="#4F46E5"/>
          </linearGradient>
        </defs>
      </svg>
      {name}
    </a>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cfg = useConfig();
  const menu = (cfg?.extra?.header?.menu as { label: string; href: string }[] | undefined) || [
    { label: 'Product', href: '#' },
    { label: 'Company', href: '#' },
    { label: 'Resources', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'Blog', href: '/blog' },
  ];
  const bookDemoText = cfg?.extra?.header?.cta?.bookDemoText || 'Book a demo';
  const bookDemoHref = cfg?.extra?.header?.cta?.bookDemoHref || '#';
  const primaryButtonText = cfg?.extra?.header?.cta?.primaryButtonText || 'Try for free';
  const primaryButtonHref = cfg?.extra?.header?.cta?.primaryButtonHref || '#';

  return (
    <header className="sticky top-0 z-50 bg-[#111111] bg-opacity-80 backdrop-blur-lg border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <MotionLogo />
            <nav className="hidden md:flex items-center space-x-6">
              {menu.map((item) => (
                item.href.startsWith('/') ? (
                  <Link key={item.label} to={item.href} className="text-brand-gray-light hover:text-white transition-colors text-base">{item.label}</Link>
                ) : (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                )
              ))}
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href={bookDemoHref} className="text-brand-gray-light hover:text-white transition-colors font-medium">
              {bookDemoText}
            </a>
            <a
              href={primaryButtonHref}
              className="px-5 py-2.5 text-white bg-gradient-to-r from-brand-indigo to-brand-purple rounded-lg font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
            >
              {primaryButtonText}
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[#161616] absolute w-full left-0 border-t border-gray-800/50"
          >
            <nav className="flex flex-col items-center space-y-6 py-8">
              {menu.map((item) => (
                item.href.startsWith('/') ? (
                  <Link key={item.label} to={item.href} className="text-brand-gray-light hover:text-white transition-colors text-base">{item.label}</Link>
                ) : (
                  <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
                )
              ))}
              <a href={bookDemoHref} className="text-brand-gray-light hover:text-white transition-colors pt-4 font-medium">
                {bookDemoText}
              </a>
              <a
                href={primaryButtonHref}
                className="px-6 py-3 text-white bg-gradient-to-r from-brand-indigo to-brand-purple rounded-lg font-semibold"
              >
                {primaryButtonText}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
  