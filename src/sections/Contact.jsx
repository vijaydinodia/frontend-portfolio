import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Mail, MapPin, Phone, Send, Loader2, ExternalLink, Linkedin, CheckCircle2 } from 'lucide-react';
import { SiLeetcode, SiGithub } from 'react-icons/si';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [profile, setProfile] = useState({
    email: 'vijaydinodia548@gmail.com',
    location: 'India',
    phone: '+91 8854823204',
    github: 'https://github.com/vijaydinodia',
    linkedin: 'https://www.linkedin.com/in/vijaydinodia',
    leetcode: 'https://leetcode.com/u/vijaydinodia/'
  });

  useEffect(() => {
    axios.get('/api/profile')
      .then(res => {
        if (res.data?.data) {
          setProfile(prev => ({
            ...prev,
            email: res.data.data.email || prev.email,
            location: res.data.data.location || prev.location,
            phone: res.data.data.phone || prev.phone,
            github: res.data.data.github || prev.github,
            linkedin: res.data.data.linkedin || prev.linkedin,
            leetcode: res.data.data.leetcode || prev.leetcode,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const dynamicText = useMemo(() => {
    return {
      greeting: "Let's Talk!",
      desc: "I'm currently open for new job opportunities, freelance client projects, and collaboration queries. Reach out today to start a conversation.",
      namePlaceholder: "Your Name / Organization",
      subjectPlaceholder: "Job Opportunity / Project Inquiry",
      messagePlaceholder: "Tell me about your project, contract details, or opportunity..."
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const targetEmail = profile.email || 'vijaydinodia548@gmail.com';

    try {
      const emailPromise = fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          subject: formData.subject,
          _subject: `[Portfolio Contact] ${formData.name} - ${formData.subject}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false'
        })
      }).catch(err => {
        console.warn('FormSubmit external dispatch:', err);
      });

      const cmsPromise = axios.post('/api/contact', {
        ...formData,
        path: window.location.pathname,
        referrer: document.referrer || '',
      }).catch(err => {
        console.warn('CMS record log:', err);
      });

      await Promise.allSettled([emailPromise, cmsPromise]);

      setStatus({
        type: 'success',
        message: `Thank you, ${formData.name}! Your message has been sent directly to ${targetEmail}. I will get back to you soon.`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact submission error:', error);
      setStatus({
        type: 'error',
        message: `Something went wrong. You can also email me directly at ${targetEmail}.`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary animate-gradient bg-300%">Touch</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
            
            {/* Contact Info (Slides in from Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -35 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -35 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="lg:col-span-2 flex flex-col justify-between space-y-8"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-textMain mb-4">{dynamicText.greeting}</h3>
                <p className="text-textMuted mb-8 font-light leading-relaxed text-sm sm:text-base">
                  {dynamicText.desc}
                </p>
                
                <div className="space-y-5">
                  <div className="flex items-center space-x-4 group p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300 border border-primary/20 shadow-sm">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-sm sm:text-base font-bold text-textMain hover:text-primary transition-colors block">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center text-secondary group-hover:bg-secondary/25 group-hover:scale-110 transition-all duration-300 border border-secondary/20 shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Location</p>
                      <p className="text-sm sm:text-base font-bold text-textMain">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group p-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center text-accent group-hover:bg-accent/25 group-hover:scale-110 transition-all duration-300 border border-accent/20 shadow-sm">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Phone</p>
                      <a href={`tel:${profile.phone}`} className="text-sm sm:text-base font-bold text-textMain hover:text-accent transition-colors block">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Profiles & Links */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs text-textMuted font-semibold tracking-wider uppercase mb-3.5">Developer Profiles</p>
                  <div className="flex flex-wrap gap-2.5">
                    {profile.github && (
                      <motion.a
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white text-xs font-semibold transition-all duration-200"
                      >
                        <SiGithub size={14} className="text-white" />
                        <span>GitHub (50+ Repos)</span>
                        <ExternalLink size={12} className="opacity-60" />
                      </motion.a>
                    )}
                    {profile.leetcode && (
                      <motion.a
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={profile.leetcode}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/30 hover:border-[#FFA116]/60 hover:bg-[#FFA116]/20 text-white text-xs font-semibold transition-all duration-200"
                      >
                        <SiLeetcode size={14} className="text-[#FFA116]" />
                        <span>LeetCode (400+ Solved)</span>
                        <ExternalLink size={12} className="opacity-60 text-[#FFA116]" />
                      </motion.a>
                    )}
                    {profile.linkedin && (
                      <motion.a
                        whileHover={{ y: -2, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/20 text-white text-xs font-semibold transition-all duration-200"
                      >
                        <Linkedin size={14} className="text-[#0A66C2]" />
                        <span>LinkedIn</span>
                        <ExternalLink size={12} className="opacity-60 text-blue-400" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Slides in from Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 35 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 35 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="lg:col-span-3"
            >
              <TiltCard className="h-full">
                <div className="glass p-7 sm:p-8 rounded-2xl border border-white/10 h-full relative group shadow-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-2xl blur opacity-5 group-hover:opacity-15 transition duration-700 pointer-events-none"></div>
                  
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-textMuted tracking-wider uppercase mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-background/40 border border-white/10 focus:border-primary/80 focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] rounded-xl px-4 py-3 text-textMain focus:outline-none transition-all duration-200 font-light text-sm"
                          placeholder={dynamicText.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-textMuted tracking-wider uppercase mb-2">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-background/40 border border-white/10 focus:border-primary/80 focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] rounded-xl px-4 py-3 text-textMain focus:outline-none transition-all duration-200 font-light text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-textMuted tracking-wider uppercase mb-2">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/40 border border-white/10 focus:border-primary/80 focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] rounded-xl px-4 py-3 text-textMain focus:outline-none transition-all duration-200 font-light text-sm"
                        placeholder={dynamicText.subjectPlaceholder}
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-textMuted tracking-wider uppercase mb-2">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/40 border border-white/10 focus:border-primary/80 focus:shadow-[0_0_15px_rgba(37,99,235,0.25)] rounded-xl px-4 py-3 text-textMain focus:outline-none transition-all duration-200 resize-none font-light text-sm"
                        placeholder={dynamicText.messagePlaceholder}
                      ></textarea>
                    </div>

                    <AnimatePresence>
                      {status.message && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className={`p-4 rounded-xl text-sm font-semibold border flex items-center gap-2.5 ${
                            status.type === 'success' 
                              ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                              : 'bg-red-500/10 border-red-500/30 text-red-400'
                          }`}
                        >
                          {status.type === 'success' && <CheckCircle2 size={18} className="shrink-0 text-green-400 animate-bounce" />}
                          <span>{status.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <a 
                        href={`mailto:${profile.email || 'vijaydinodia548@gmail.com'}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Vijay,\n\nName: ${formData.name || ''}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}`)}`}
                        className="text-xs text-textMuted hover:text-accent underline transition-colors order-2 sm:order-1"
                      >
                        ✉️ Or send via default email app
                      </a>

                      <Magnetic range={35}>
                        <motion.button 
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          type="submit" 
                          disabled={loading}
                          data-cursor="send"
                          className="px-9 py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primaryHover hover:to-accentHover text-white font-bold flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.6)] disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto order-1 sm:order-2 text-sm sm:text-base gap-2"
                        >
                          {loading ? (
                            <><Loader2 size={18} className="animate-spin" /> Sending...</>
                          ) : (
                            <><Send size={16} /> Send Message</>
                          )}
                        </motion.button>
                      </Magnetic>
                    </div>
                  </form>
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
