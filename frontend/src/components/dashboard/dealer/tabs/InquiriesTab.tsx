
import React from 'react';

const InquiriesTab: React.FC = () => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">Customer Inquiries</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-border">
        <div className="p-4 bg-secondary/30 border-b border-border">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search inquiries..."
              className="input-field text-sm"
            />
            <select className="input-field text-sm">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-muted-foreground mb-4">
            No inquiries found. When customers inquire about your vehicles, they will appear here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InquiriesTab;
