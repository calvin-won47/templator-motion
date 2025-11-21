
import React from 'react';

const Cta: React.FC = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="relative bg-gradient-radial from-gray-900/50 to-transparent rounded-lg p-8 md:p-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-purple-600/20 via-transparent to-transparent blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto tracking-tighter">
              The average person spends 13 hours/week in their inbox
            </h2>
            <p className="text-lg md:text-xl text-brand-gray-light mt-6 max-w-2xl mx-auto">
              Reclaim your time from email. Let an AI assistant manage your inbox.
            </p>
            <div className="mt-10">
              <a
                href="#"
                className="inline-block px-8 py-4 text-lg text-white bg-gradient-to-r from-brand-indigo to-brand-purple rounded-lg font-semibold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
              >
                Try for free
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
  