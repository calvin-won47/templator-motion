
import React from 'react';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a href={href} className="text-brand-gray-light hover:text-white transition-colors text-base">
      {children}
    </a>
  </li>
);

const MotionLogo = () => (
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
    motion
  </a>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-gray py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <MotionLogo />
            <p className="text-brand-gray-light mt-4 max-w-xs text-base">
              The all-in-one app for your time. Calendars, projects, and tasks — together.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">Product</h3>
            <ul className="space-y-3 mt-4">
              <FooterLink href="#">Download</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Book a demo</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">Features</h3>
            <ul className="space-y-3 mt-4">
              <FooterLink href="#">Calendar</FooterLink>
              <FooterLink href="#">Project Management</FooterLink>
              <FooterLink href="#">Task Management</FooterLink>
              <FooterLink href="#">Meeting Scheduler</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">Resources</h3>
            <ul className="space-y-3 mt-4">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">What's new</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-base">Company</h3>
            <ul className="space-y-3 mt-4">
              <FooterLink href="#">About us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact us</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brand-gray-light text-sm">
            &copy; {new Date().getFullYear()} Motion, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-brand-gray-light hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-brand-gray-light hover:text-white transition-colors text-sm">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  