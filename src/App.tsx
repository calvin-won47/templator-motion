
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Integrations from './components/Integrations';
import Cta from './components/Cta';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

const App: React.FC = () => {
  const Home = () => (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Integrations />
      <Cta />
    </main>
  );

  return (
    <div className="bg-[#111] text-white overflow-x-hidden font-sans">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
  