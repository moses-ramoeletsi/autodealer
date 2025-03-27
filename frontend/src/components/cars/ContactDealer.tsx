
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useInquiry } from '../../context/InquiryContext';
import { Car } from '../../types';

interface ContactDealerProps {
  car: Car;
}

const ContactDealer: React.FC<ContactDealerProps> = ({ car }) => {
  const { isAuthenticated } = useAuth();
  const { createInquiry, scheduleTestDrive } = useInquiry();
  
  const [message, setMessage] = useState('');
  const [testDriveDate, setTestDriveDate] = useState('');
  const [testDriveTime, setTestDriveTime] = useState('');
  const [contactType, setContactType] = useState('inquiry'); // 'inquiry' or 'testDrive'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!isAuthenticated) {
      setError('Please log in to contact the dealer');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (contactType === 'inquiry') {
        await createInquiry(car.id, car.dealerId, message);
        setSuccess('Your inquiry has been sent successfully!');
        setMessage('');
      } else {
        if (!testDriveDate || !testDriveTime) {
          throw new Error('Please select both date and time for your test drive');
        }
        
        const testDriveDateTime = new Date(`${testDriveDate}T${testDriveTime}`);
        
        if (testDriveDateTime <= new Date()) {
          throw new Error('Test drive time must be in the future');
        }
        
        await scheduleTestDrive(car.id, car.dealerId, testDriveDateTime);
        setSuccess('Your test drive has been scheduled successfully!');
        setTestDriveDate('');
        setTestDriveTime('');
      }
    } catch (err: any) {
      setError(err.message || 'There was an error sending your request');
      console.error('Contact dealer error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get tomorrow's date for min date input
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  
  // Get max date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];
  
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Contact Dealer</h3>
        <p className="text-muted-foreground mb-4">
          Please sign in to contact the dealer about this vehicle.
        </p>
        <a href="/login" className="button-primary w-full block text-center">
          Sign In
        </a>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
      <h3 className="text-lg font-semibold mb-4">Contact Dealer</h3>
      
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-sm">
          {success}
        </div>
      )}
      
      <div className="flex mb-4 border-b border-border">
        <button
          type="button"
          className={`pb-2 px-4 text-sm font-medium transition-colors border-b-2 ${
            contactType === 'inquiry'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
          onClick={() => setContactType('inquiry')}
        >
          Send Inquiry
        </button>
        <button
          type="button"
          className={`pb-2 px-4 text-sm font-medium transition-colors border-b-2 ${
            contactType === 'testDrive'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
          }`}
          onClick={() => setContactType('testDrive')}
        >
          Schedule Test Drive
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {contactType === 'inquiry' ? (
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="input-field"
              placeholder="I'm interested in this car. Can you provide more information?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="testDriveDate" className="block text-sm font-medium mb-1">
                Preferred Date
              </label>
              <input
                id="testDriveDate"
                type="date"
                className="input-field"
                min={tomorrowStr}
                max={maxDateStr}
                value={testDriveDate}
                onChange={(e) => setTestDriveDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="testDriveTime" className="block text-sm font-medium mb-1">
                Preferred Time
              </label>
              <input
                id="testDriveTime"
                type="time"
                className="input-field"
                min="09:00"
                max="17:00"
                value={testDriveTime}
                onChange={(e) => setTestDriveTime(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Business hours: 9:00 AM - 5:00 PM
              </p>
            </div>
          </>
        )}
        
        <button
          type="submit"
          className="button-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Sending...'
            : contactType === 'inquiry'
              ? 'Send Inquiry'
              : 'Schedule Test Drive'
          }
        </button>
      </form>
    </div>
  );
};

export default ContactDealer;
