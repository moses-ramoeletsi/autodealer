
import React, { useState } from 'react';
import Layout from '../components/common/Layout';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setSuccess('Your message has been sent successfully. We will get back to you soon!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError('There was an error sending your message. Please try again later.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="bg-secondary pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions or need assistance? We're here to help! Reach out to our team 
              and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            
            {success && (
              <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                {success}
              </div>
            )}
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="service">Service Question</option>
                  <option value="parts">Parts Department</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="button-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Our Information</h2>
            
            <div className="grid grid-cols-1 gap-6 mb-8">
              <ContactCard
                icon="location"
                title="Our Location"
                details={['123 Luxury Lane', 'Car City, CC 10101']}
              />
              <ContactCard
                icon="phone"
                title="Phone"
                details={['(123) 456-7890', '(123) 456-7891']}
              />
              <ContactCard
                icon="mail"
                title="Email"
                details={['info@autoelite.com', 'sales@autoelite.com']}
              />
              <ContactCard
                icon="clock"
                title="Business Hours"
                details={[
                  'Monday-Friday: 9:00 AM - 6:00 PM',
                  'Saturday: 10:00 AM - 4:00 PM',
                  'Sunday: Closed'
                ]}
              />
            </div>
            
            <div className="rounded-lg overflow-hidden h-64 bg-secondary">
              {/* Map would go here in a real implementation */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Interactive Map Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface ContactCardProps {
  icon: 'location' | 'phone' | 'mail' | 'clock';
  title: string;
  details: string[];
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, details }) => {
  const renderIcon = () => {
    switch (icon) {
      case 'location':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        );
      case 'mail':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-border">
      <div className="flex items-start">
        <div className="p-2 bg-primary/10 rounded-full text-primary mr-4">
          {renderIcon()}
        </div>
        <div>
          <h3 className="font-semibold mb-2">{title}</h3>
          <div className="space-y-1">
            {details.map((detail, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {detail}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
