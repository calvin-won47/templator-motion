
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-brand-gray-light hover:text-white transition-colors text-base">
      {children}
    </a>
  </li>
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

const Footer: React.FC = () => {
  const cfg = useConfig();
  const desc = cfg?.extra?.footer?.description || 'The all-in-one app for your time. Calendars, projects, and tasks — together.';
  const sections = (cfg?.extra?.footer?.sections as { title: string; links: { label: string; href: string }[] }[] | undefined) || [
    { title: 'Product', links: [{ label: 'Download', href: '#' }, { label: 'Pricing', href: '#' }, { label: 'Book a demo', href: '#' }] },
    { title: 'Features', links: [{ label: 'Calendar', href: '#' }, { label: 'Project Management', href: '#' }, { label: 'Task Management', href: '#' }, { label: 'Meeting Scheduler', href: '#' }] },
    { title: 'Resources', links: [{ label: 'Blog', href: '/blog' }, { label: 'Help Center', href: '#' }, { label: "What's new", href: '#' }] },
    { title: 'Company', links: [{ label: 'About us', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact us', href: '#' }] },
  ];
  const legalLinks = (cfg?.extra?.footer?.legalLinks as { label: string; href: string }[] | undefined) || [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ];
  return (
    <footer className="bg-brand-gray py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <MotionLogo />
            <p className="text-brand-gray-light mt-4 max-w-xs text-base">
              {desc}
            </p>
          </div>
          {sections.map(section => (
            <div key={section.title}>
              <h3 className="font-semibold text-white text-base">{section.title}</h3>
              <ul className="space-y-3 mt-4">
                {section.links.map(link => (
                  <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-gray-light text-sm">
            &copy; {new Date().getFullYear()} { (cfg?.basic?.app_name || 'Motion') }, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {legalLinks.map(link => (
              <a key={link.label} href={link.href} className="text-brand-gray-light hover:text-white transition-colors text-sm">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  