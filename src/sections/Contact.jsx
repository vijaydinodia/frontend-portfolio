import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import Magnetic from '../components/Magnetic';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [profile, setProfile] = useState({
    email: 'hello@vijaydinodia.com',
    location: 'India',
    phone: '+91 9876543210'
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

    try {
      const res = await axios.post('/api/contact', formData);
      if (res.status === 201) {
        setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary animate-gradient bg-300%">Touch</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-textMain mb-6">{dynamicText.greeting}</h3>
                <p className="text-textMuted mb-8 font-light leading-relaxed">
                  {dynamicText.desc}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/25 group-hover:scale-115 transition-all duration-300 border border-primary/10">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Email</p>
                      <a href={`mailto:${profile.email}`} className="text-lg font-bold text-textMain hover:text-primary transition-colors block">
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center text-secondary group-hover:bg-secondary/25 group-hover:scale-115 transition-all duration-300 border border-secondary/10">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Location</p>
                      <p className="text-lg font-bold text-textMain">{profile.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group">
                    <div className="w-12 h-12 bg-accent/15 rounded-full flex items-center justify-center text-accent group-hover:bg-accent/25 group-hover:scale-115 transition-all duration-300 border border-accent/10">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-xs text-textMuted font-semibold tracking-wider uppercase">Phone</p>
                      <a href={`tel:${profile.phone}`} className="text-lg font-bold text-textMain hover:text-accent transition-colors block">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <TiltCard className="h-full">
                <div className="glass p-8 rounded-2xl border border-white/10 h-full relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-2xl blur opacity-5 group-hover:opacity-15 transition duration-1000 pointer-events-none"></div>
                  
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-xs font-semibold text-textMuted tracking-wider uppercase mb-2">Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-background/30 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-textMain focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-light"
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
                          className="w-full bg-background/30 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-textMain focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-light"
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
                        className="w-full bg-background/30 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-textMain focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all font-light"
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
                        className="w-full bg-background/30 border border-white/10 focus:border-primary/60 rounded-xl px-4 py-3 text-textMain focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none font-light"
                        placeholder={dynamicText.messagePlaceholder}
                      ></textarea>
                    </div>

                    {status.message && (
                      <div className={`p-4 rounded-xl text-sm font-semibold border ${status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {status.message}
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Magnetic range={40}>
                        <button 
                          type="submit" 
                          disabled={loading}
                          data-cursor="send"
                          className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:from-primaryHover hover:to-accentHover text-white font-bold flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed block w-full md:w-auto"
                        >
                          {loading ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <>
                              <Send size={18} className="mr-2" /> Send Message
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </form>
                </div>
              </TiltCard>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
