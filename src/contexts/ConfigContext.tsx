import React, { createContext, useContext } from 'react';

type BasicSeo = { title?: string; description?: string; keywords?: string };
type BasicHero = { slogan?: string; description?: string };
type Basic = {
  app_name?: string;
  strapi_url?: string;
  strapi_site_slug?: string;
  gtmId?: string;
  seo?: BasicSeo;
  hero?: BasicHero;
};
type Config = { basic?: Basic; extra?: Record<string, any> };

const ConfigContext = createContext<Config | null>(null);

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const config = (typeof window !== 'undefined' && (window as any).APP_CONFIG) || {};
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error('useConfig must be used within ConfigProvider');
  }
  return context;
};