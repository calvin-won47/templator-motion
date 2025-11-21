
import React from 'react';

const testimonials = [
  {
    quote: "Motion is the first app that’s been able to keep up with me. I have 2 companies, 3 kids, and a very full life. Motion is my secret weapon.",
    author: "Brooke Anderson",
    title: "Founder, The Social Celebrity",
    avatar: "https://picsum.photos/id/237/48/48",
  },
  {
    quote: "I'm a big fan of Motion. It's a game-changer for anyone who wants to be more productive and organized.",
    author: "Ethan Hunt",
    title: "Productivity Guru",
    avatar: "https://picsum.photos/id/238/48/48",
  },
  {
    quote: "The AI scheduling is magical. It takes the stress out of planning my week.",
    author: "Sarah Connor",
    title: "Software Engineer",
    avatar: "https://picsum.photos/id/239/48/48",
  },
  {
    quote: "As a student, Motion helps me balance my classes, part-time job, and social life. I can't imagine my life without it.",
    author: "John Doe",
    title: "University Student",
    avatar: "https://picsum.photos/id/240/48/48",
  },
  {
    quote: "Our team's productivity has skyrocketed since we started using Motion for project management.",
    author: "Jane Smith",
    title: "Team Lead, TechCorp",
    avatar: "https://picsum.photos/id/241/48/48",
  },
  {
    quote: "Finally, a tool that understands how I work. Motion has been a lifesaver.",
    author: "Mike Ross",
    title: "Lawyer",
    avatar: "https://picsum.photos/id/242/48/48",
  },
];

const TestimonialCard = ({ quote, author, title, avatar }: typeof testimonials[0]) => (
  <div className="bg-[#1C1C1C] p-6 rounded-2xl flex flex-col justify-between w-[350px] h-full mx-4 border border-white/10">
    <p className="text-brand-gray-light text-base">"{quote}"</p>
    <div className="flex items-center mt-6">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
      <div className="ml-4">
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-brand-gray-light">{title}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-32 bg-[#111] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            100,000+ professionals use Motion to get more done
          </h2>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-8">
        <div className="w-full inline-flex flex-nowrap">
          <div className="flex items-center justify-center md:justify-start [&_div]:mx-4 animate-infinite-scroll">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`top-${index}`} {...testimonial} />
            ))}
          </div>
           <div className="flex items-center justify-center md:justify-start [&_div]:mx-4 animate-infinite-scroll" aria-hidden="true">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`top-clone-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
        <div className="w-full inline-flex flex-nowrap">
          <div className="flex items-center justify-center md:justify-start [&_div]:mx-4 animate-infinite-scroll-reverse">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`bottom-${index}`} {...testimonial} />
            ))}
          </div>
          <div className="flex items-center justify-center md:justify-start [&_div]:mx-4 animate-infinite-scroll-reverse" aria-hidden="true">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`bottom-clone-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
  