
import React from 'react';
import { useConfig } from '../contexts/ConfigContext';

const Hero: React.FC = () => {
  const cfg = useConfig();
  const slogan = cfg?.basic?.hero?.slogan || 'The all-in-one app for your time.';
  const description = cfg?.basic?.hero?.description || 'Calendars, projects, and tasks — together.';
  const emailPlaceholder = cfg?.extra?.hero?.emailPlaceholder || 'Enter your work email';
  const heroButtonText = cfg?.extra?.hero?.primaryButtonText || 'Try for free';
  const joinText = cfg?.extra?.hero?.joinText || 'Join 100,000+ users';
  const heroImage = cfg?.extra?.hero?.image || 'https://www.usemotion.com/static/media/screenshot-calendar.62495791.png';
  return (
    <section className="relative py-20 md:py-32 text-center overflow-hidden">
       <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight tracking-tighter">
          {slogan}
        </h1>
        <p className="text-lg md:text-xl text-brand-gray-light mt-6 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder={emailPlaceholder}
            className="w-full px-4 py-3 bg-[#2a2a2a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple placeholder-gray-500"
          />
          <button className="w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r from-brand-indigo to-brand-purple rounded-lg font-semibold whitespace-nowrap text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow">
            {heroButtonText}
          </button>
        </div>
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="flex -space-x-3">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#111]" src="https://picsum.photos/id/1005/32/32" alt="User 1" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#111]" src="https://picsum.photos/id/1027/32/32" alt="User 2" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#111]" src="https://picsum.photos/id/1011/32/32" alt="User 3" />
          </div>
          <p className="text-brand-gray-light">{joinText}</p>
        </div>
        <div className="mt-20 relative">
           <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-gradient-radial from-purple-600/30 via-transparent to-transparent blur-3xl -z-10"></div>
          <img
            src={heroImage}
            alt="Motion app interface"
            className="rounded-2xl shadow-2xl mx-auto w-full max-w-5xl border border-white/10"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
  