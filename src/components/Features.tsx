
import React, { useState } from 'react';
import { Calendar, FolderKanban, CheckSquare } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

const featuresData = [
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Calendar',
    description: 'The fastest calendar in the universe. Intelligently plan your day.',
    image: 'https://www.usemotion.com/static/media/screenshot-calendar.62495791.png',
  },
  {
    id: 'projects',
    icon: FolderKanban,
    title: 'Projects',
    description: 'Manage all your team’s projects. Without the chaos.',
    image: 'https://www.usemotion.com/static/media/screenshot-projects.a9140819.png',
  },
  {
    id: 'tasks',
    icon: CheckSquare,
    title: 'Tasks',
    description: 'Your AI assistant for time management. Automatically schedule your tasks.',
    image: 'https://www.usemotion.com/static/media/screenshot-tasks.a72a1c56.png',
  },
];

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState('calendar');

  const activeFeature = featuresData.find(f => f.id === activeTab);

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            The only app you need to manage your time
          </h2>
          <p className="text-lg md:text-xl text-brand-gray-light mt-6">
            Motion is one app for your calendar, project management, and task management.
          </p>
        </div>

        <div className="mt-16">
          <div className="flex justify-center border-b border-gray-800">
            {featuresData.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={twMerge(
                  'flex-1 md:flex-initial md:px-8 py-4 text-center font-semibold text-brand-gray-light transition-colors relative',
                  activeTab !== feature.id && 'hover:text-white'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  <feature.icon size={20} />
                  <span>{feature.title}</span>
                </div>
                {activeTab === feature.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple"
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-12 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold">{activeFeature?.title}</h3>
                <p className="text-lg md:text-xl text-brand-gray-light mt-4 max-w-2xl mx-auto">
                  {activeFeature?.description}
                </p>
                <div className="mt-8 relative">
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-gradient-radial from-purple-600/30 via-transparent to-transparent blur-3xl -z-10"></div>
                  <img
                    src={activeFeature?.image}
                    alt={`${activeFeature?.title} feature`}
                    className="rounded-2xl shadow-2xl mx-auto w-full max-w-5xl border border-white/10"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
  