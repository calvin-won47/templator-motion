
import React from 'react';
import { Zap, Slack, Video, Mail, Calendar, Users } from 'lucide-react';

const integrations = [
  { name: 'Gmail', icon: Mail },
  { name: 'Google Calendar', icon: Calendar },
  { name: 'Microsoft Outlook', icon: Mail },
  { name: 'Zoom', icon: Video },
  { name: 'Microsoft Teams', icon: Users },
  { name: 'Slack', icon: Slack },
  { name: 'Zapier', icon: Zap },
];

const Integrations: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
          Works with your favorite tools
        </h2>
        <p className="text-lg md:text-xl text-brand-gray-light mt-6 max-w-2xl mx-auto">
          Motion integrates with the tools you already use.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.name} className="flex flex-col items-center justify-center text-center p-4 bg-[#1C1C1C] rounded-xl w-40 h-32 border border-white/10">
                <Icon className="h-10 w-10 text-brand-gray-light" />
                <p className="mt-3 font-medium text-sm text-white">{integration.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Integrations;
  