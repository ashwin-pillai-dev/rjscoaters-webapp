'use client'
import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <iframe 
        title="RJS Coaters Location"
        // Replace this src with your exact Google Maps Embed link
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.1760814980637!2d73.1362!3d19.3178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7980000000001%3A0x123456789abcdef!2sMIDC%20Kudavali%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;