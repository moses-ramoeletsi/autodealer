
import React from 'react';
import Layout from '../components/common/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="bg-secondary pt-24 pb-16">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About AutoElite</h1>
            <p className="text-lg text-muted-foreground">
              We're dedicated to providing the finest luxury vehicles with exceptional service, 
              making your car buying experience seamless and enjoyable.
            </p>
          </div>
        </div>
      </div>
      
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2008, AutoElite began with a simple vision: to transform the car buying experience
              from stressful to exceptional. Our founders, seasoned automotive professionals, saw an opportunity
              to create a dealership that puts customer satisfaction above all else.
            </p>
            <p className="text-muted-foreground mb-4">
              What started as a small showroom with just 15 premium vehicles has grown into one of the most
              respected names in luxury auto sales, with hundreds of satisfied customers and a reputation
              for excellence.
            </p>
            <p className="text-muted-foreground">
              Today, we continue our commitment to quality, transparency, and customer service as we expand
              our selection and enhance our offerings to meet the evolving needs of discerning car buyers.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
              alt="Modern car showroom"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards in every aspect of our business, from our vehicle
                selection to our customer service. We're not satisfied unless you are.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p className="text-muted-foreground">
                We believe in complete honesty about our vehicles and pricing. No hidden fees,
                no pressure tactics, and no unwelcome surprises.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We continually embrace new technologies and approaches to improve the car buying
                experience, making it more convenient, enjoyable, and tailored to your needs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <TeamMember
              name="Alex Morgan"
              role="CEO & Founder"
              image="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <TeamMember
              name="Sarah Chen"
              role="Sales Director"
              image="https://randomuser.me/api/portraits/women/44.jpg"
            />
            <TeamMember
              name="David Wilson"
              role="Technical Specialist"
              image="https://randomuser.me/api/portraits/men/36.jpg"
            />
            <TeamMember
              name="Jessica Rivera"
              role="Customer Experience"
              image="https://randomuser.me/api/portraits/women/65.jpg"
            />
          </div>
        </div>
        
        <div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-border text-center">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions about our vehicles,
              need assistance with financing, or want to schedule a test drive, our team
              is here to help.
            </p>
            <a href="/contact" className="button-primary">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden text-center group">
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default About;
