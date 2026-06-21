import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Hardcoded local URL for now, could be an env var
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
    <section id="contact" className="py-12 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-center">Get In <span className="text-accent">Touch</span></h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-2xl font-bold text-textMain mb-6">Let's Talk!</h3>
              <p className="text-textMuted mb-8">
                I'm currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, feel free to reach out.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-textMuted font-medium">Email</p>
                    <a href={`mailto:${profile.email}`} className="text-lg font-semibold text-textMain hover:text-primary transition-colors block">
                      {profile.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-textMuted font-medium">Location</p>
                    <p className="text-lg font-semibold text-textMain">{profile.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-textMuted font-medium">Phone</p>
                    <a href={`tel:${profile.phone}`} className="text-lg font-semibold text-textMain hover:text-accent transition-colors block">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="glass p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-textMuted mb-2">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-textMuted mb-2">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-textMuted mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-textMuted mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-textMain focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>

                  {status.message && (
                    <div className={`p-4 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {status.message}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 rounded-lg bg-primary hover:bg-primaryHover text-white font-medium flex items-center justify-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <Send size={20} className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
