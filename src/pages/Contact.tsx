
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
              Connect With Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Have a project in mind or want to learn more about our services?
              We'd love to hear from you.
            </p>
          </div>
        </div>
        
        <ContactSection />
        
        {/* Office Locations */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Locations</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Visit us at one of our office locations around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                city: 'San Francisco',
                address: '123 Design Street, San Francisco, CA 94103',
                phone: '+1 (123) 456-7890',
                email: 'sf@seendesignlab.com'
              },
              {
                city: 'New York',
                address: '456 Creative Ave, New York, NY 10001',
                phone: '+1 (234) 567-8901',
                email: 'nyc@seendesignlab.com'
              },
              {
                city: 'London',
                address: '789 Innovation Lane, London, UK EC1V 9BX',
                phone: '+44 20 1234 5678',
                email: 'london@seendesignlab.com'
              }
            ].map((office, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden">
                <div className="h-48 bg-white/5">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25379.958959559797!2d-122.4234374902789!3d37.773714681246504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1624923222548!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy"
                    title={`${office.city} Office Map`}
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{office.city}</h3>
                  <p className="text-white/70 mb-4">{office.address}</p>
                  <div className="space-y-2">
                    <p className="text-white/70 text-sm">
                      <span className="text-white/40 mr-2">Phone:</span> {office.phone}
                    </p>
                    <p className="text-white/70 text-sm">
                      <span className="text-white/40 mr-2">Email:</span> {office.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Find answers to common questions about our services and processes.
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: 'What services does Seen Design Lab offer?',
                answer: 'We offer a comprehensive range of digital services including UI/UX design, web and mobile application development, brand identity design, and digital product strategy.'
              },
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary depending on complexity and scope. A simple website might take 4-6 weeks, while a complex application could take 3-6 months. We\'ll provide a detailed timeline during our initial consultation.'
              },
              {
                question: 'What is your design process?',
                answer: 'Our design process begins with discovery (understanding your business and users), followed by research, ideation, prototyping, testing, and refinement. We collaborate closely with clients throughout this iterative process.'
              },
              {
                question: 'Do you work with clients remotely?',
                answer: 'Yes, we work with clients worldwide and have established efficient remote collaboration processes using tools like Figma, Slack, and Zoom to ensure smooth communication regardless of location.'
              },
              {
                question: 'How do you price your services?',
                answer: 'We typically work on a project basis with fixed pricing based on the scope and requirements. For some clients, we also offer retainer arrangements for ongoing work. We\'re transparent about costs and will provide detailed quotes after understanding your needs.'
              }
            ].map((faq, index) => (
              <div key={index} className="glass-light rounded-xl p-6 hover:glass transition-all duration-300">
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
