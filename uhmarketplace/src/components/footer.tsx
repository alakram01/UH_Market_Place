// components/Footer.tsx
import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const Footer = () => {
  return (
    <footer id="about" className="bg-gray-800 text-white">
      <div className="container mx-auto px-16 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-4 px-20">
          {/* About Section with Logo */}
          <div className="flex items-start space-x-8">
            {/* Logo */}
            <div className="w-100">
              <Image 
                src="/landing-images/UH-Logo.png" // Replace with your logo path
                alt="Company Logo"
                width={90} // Adjust size as needed
                height={90}
                className="rounded"
              />
            </div>
            {/* About Text */}
            

            <div className="pl-8">
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Email Us</a>
              </li>
            </ul>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-sm">
                We are a group of UH Cougars, passionate in creating an impact on our community.
              </p>
            </div>
          </div>

          {/* Contact Section */}
          <div className="pl-10">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-sm">Email: contact@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                
              </a>
              <a href="#" className="hover:text-gray-400">
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm pt-8">
          <p>&copy; {new Date().getFullYear()} CoogBay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;