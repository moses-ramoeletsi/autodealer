
import React from 'react';

const TestDrivesTab: React.FC = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">Test Drive Appointments</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-border">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search appointments..."
              className="input-field text-sm"
            />
            <select className="input-field text-sm">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No test drive appointments found. When customers schedule test drives, they will appear here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestDrivesTab;
