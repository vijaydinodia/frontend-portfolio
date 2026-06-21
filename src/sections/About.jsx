import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [profile, setProfile] = useState({
    aboutPara1: 'I am a passionate Full Stack Engineer specializing in the MERN stack. My focus is on building robust backend architectures and highly interactive, premium frontend experiences.',
    aboutPara2: "With experience as a MERN Stack Developer Intern, I've solved over 250+ LeetCode problems and actively participated in hackathons to continuously sharpen my problem-solving skills.",
    highlights: [
      { title: '250+ LeetCode Solved', desc: 'Strong foundation in Data Structures and Algorithms.' },
      { title: 'Hackathon Enthusiast', desc: 'Building MVPs rapidly under pressure.' },
    ],
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => setProfile(prev => ({ ...prev, ...res.data.data })))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-12 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">About <span className="text-primary">Me</span></h2>
          
          <div className={`grid grid-cols-1 ${
            profile.profileImageUrl 
              ? 'md:grid-cols-2 lg:grid-cols-12' 
              : 'md:grid-cols-2'
          } gap-8 items-center`}>
            {profile.profileImageUrl && (
              <div className="md:col-span-1 lg:col-span-4 flex justify-center w-full">
                <div className="relative group w-full max-w-[320px] lg:max-w-full aspect-square">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient bg-300%"></div>
                  <div className="relative glass rounded-2xl p-3 h-full w-full flex items-center justify-center">
                    <img
                      src={profile.profileImageUrl}
                      alt={profile.name || "Vijay Dinodia"}
                      className="w-full h-full object-cover rounded-xl filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-in-out border border-white/5 shadow-inner"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className={`${
              profile.profileImageUrl ? 'md:col-span-1 lg:col-span-5' : 'md:col-span-1'
            } relative group h-full`}>
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-semibold mb-4 text-secondary">My Journey</h3>
                <p className="text-textMuted mb-4 leading-relaxed">{profile.aboutPara1}</p>
                <p className="text-textMuted leading-relaxed">{profile.aboutPara2}</p>
              </div>
            </div>

            <div className={`${
              profile.profileImageUrl ? 'md:col-span-2 lg:col-span-3' : 'md:col-span-1'
            } space-y-6 w-full`}>
              {profile.highlights.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="glass p-6 rounded-xl border-l-4 border-accent hover:border-primary transition-all duration-300 hover:translate-x-1"
                >
                  <h4 className="text-xl font-bold text-textMain">{item.title}</h4>
                  <p className="text-textMuted text-sm mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
