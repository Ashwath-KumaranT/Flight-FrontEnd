import React from 'react'
import './Hero.css';

const Hero = () => {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to SkyVista Airways!
            </h1>
            <p className="text-lg mb-8">
              Your trusted airline for a memorable and comfortable flying experience.
            </p>
            <p className="text-xl font-medium">
              Over 25 years of excellence in the air.
            </p>
          </div>
        </div>
  
        {/* About Us Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">About SkyVista Airways</h2>
          <p className="text-lg text-gray-700 mb-8">
            At SkyVista Airways, we prioritize the comfort, safety, and satisfaction of our passengers above all. 
            With over 25 years of experience in the aviation industry, we have established ourselves as a leader in 
            providing high-quality air travel services to travelers across the globe. 
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Whether you're flying for business or leisure, we ensure that your journey with us is smooth, 
            enjoyable, and stress-free. Our fleet of modern aircraft is equipped with the latest amenities to 
            provide you with an unparalleled travel experience.
          </p>
        </div>
  
        {/* Travel Experience Section */}
        <div className="bg-blue-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Commitment to Your Comfort</h2>
            <p className="text-lg text-gray-700 mb-8">
              At SkyVista Airways, we believe that flying should be a pleasant experience from start to finish. 
              Here’s what you can expect when you travel with us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Comfortable Seating</h3>
                <p className="text-gray-700">
                  Our seats are designed with comfort in mind, offering ample legroom and adjustable settings for 
                  your convenience.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">In-Flight Entertainment</h3>
                <p className="text-gray-700">
                  Enjoy a wide range of movies, TV shows, and music with our in-flight entertainment system. 
                  We cater to every passenger's entertainment needs.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600 mb-4">Delicious Dining</h3>
                <p className="text-gray-700">
                  Indulge in our freshly prepared meals, made with high-quality ingredients and available in 
                  various options, including vegetarian and gluten-free.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Why Choose Us Section */}
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Why Choose SkyVista Airways?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Safety First</h3>
              <p className="text-gray-700">
                Our top priority is ensuring the safety of our passengers. We adhere to strict safety protocols 
                and maintain our aircraft to the highest standards.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Global Reach</h3>
              <p className="text-gray-700">
                With a vast network of destinations worldwide, SkyVista Airways makes it easy to travel anywhere 
                you need to go.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Award-Winning Service</h3>
              <p className="text-gray-700">
                We’ve been recognized for our exceptional service, winning multiple awards for customer satisfaction 
                and comfort.
              </p>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <div className="bg-gray-800 text-white py-6">
          <div className="container mx-auto text-center">
            <p className="text-lg">
              &copy; 2025 SkyVista Airways. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  
export default Hero