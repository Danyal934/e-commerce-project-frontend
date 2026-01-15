import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['Alpine Harvest GmbH', 'Naturestrasse 123', '8000 Zürich, Switzerland']
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: 'Email Us',
      details: ['info@alpineharvest.com', 'support@alpineharvest.com']
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['+41 44 123 45 67', 'Mon-Fri: 9AM-6PM CET']
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 - 18:00', 'Saturday: 10:00 - 16:00', 'Sunday: Closed']
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with questions, feedback, or just to say hello!
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaPaperPlane className="w-5 h-5 mr-3" />
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-blue-600 mb-4">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium">Zürich, Switzerland</p>
                  <p className="text-gray-500 text-sm">Our headquarters location</p>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Do you ship internationally?</h4>
                  <p className="text-gray-600">
                    Yes! We ship across Europe with expedited options available.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">What are your return policies?</h4>
                  <p className="text-gray-600">
                    We offer 30-day returns for unused products in original packaging.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">Are your products organic?</h4>
                  <p className="text-gray-600">
                    All our products are certified organic and sustainably sourced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
