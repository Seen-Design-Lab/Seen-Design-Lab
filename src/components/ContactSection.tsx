
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset submission state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@seendesignlab.com',
      link: 'mailto:hello@seendesignlab.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (123) 456-7890',
      link: 'tel:+11234567890'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      link: 'https://maps.google.com'
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-seen-accent3/10 rounded-full filter blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-seen-accent1/10 rounded-full filter blur-3xl" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Start a Conversation</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have a project in mind or want to learn more about our services?
            We'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="text-white/70">
                Fill out the form or reach out to us directly using the contact information below.
              </p>
            </div>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={index}
                    href={item.link}
                    target={item.icon === MapPin ? '_blank' : undefined}
                    rel={item.icon === MapPin ? 'noopener noreferrer' : undefined}
                    className="flex items-start py-4 px-5 glass-light hover:glass rounded-xl transition-all duration-300 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 group-hover:bg-white/10 transition-colors duration-300">
                      <Icon size={18} className="text-seen-accent1 group-hover:text-seen-accent2 transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white/60 mb-1">{item.title}</h4>
                      <p className="text-base font-medium">{item.details}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
            
            <div className="flex space-x-4">
              {['twitter', 'instagram', 'dribbble', 'linkedin'].map((social, index) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                >
                  <img 
                    src={`https://api.iconify.design/mdi:${social}.svg`} 
                    alt={social} 
                    className="w-5 h-5 text-white/80"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-8"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-seen-accent1/20 flex items-center justify-center mb-6">
                  <Send size={24} className="text-seen-accent1" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-white/70">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Your Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40 transition-colors duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40 transition-colors duration-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40 transition-colors duration-200"
                  >
                    <option value="" disabled className="bg-seen-dark text-white/70">Select a subject</option>
                    <option value="general" className="bg-seen-dark text-white/90">General Inquiry</option>
                    <option value="project" className="bg-seen-dark text-white/90">Project Discussion</option>
                    <option value="support" className="bg-seen-dark text-white/90">Support</option>
                    <option value="other" className="bg-seen-dark text-white/90">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40 transition-colors duration-200 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-seen-accent1 to-seen-accent2 text-black font-medium rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
