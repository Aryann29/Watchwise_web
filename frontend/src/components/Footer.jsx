import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div>
          <h2 className="font-bold text-7xl">Watch<span>Wise</span> </h2>
          <p className="mt-2">Your Ultimate Movie Recommendation and Database Website</p>
        </div>
        <div>
          <h2 className="font-bold text-lg">Contact Me</h2>
          <ul className="mt-2">
            <li>Email: aryanp29029@gmail.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: Mumbai India</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
