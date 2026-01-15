import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import ProductCard from '../../components/Product/ProductCard';
import { FaMountain, FaLeaf, FaShippingFast, FaAward, FaStar } from 'react-icons/fa';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data);
        // Get featured products
        const featured = data.filter(product => product.featured).slice(0, 4);
        setFeaturedProducts(featured);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  const features = [
    {
      icon: <FaMountain className="w-8 h-8" />,
      title: 'Alpine Sourced',
      description: 'Products sourced from pristine European mountains'
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: '100% Organic',
      description: 'Certified organic and pesticide-free'
    },
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: 'Fast Shipping',
      description: 'Free delivery across Europe'
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Award-winning products'
    }
  ];
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden">
      {/* Hero Section with Swiss Alps Background */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop&q=80"
            alt="Swiss Alps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Taste the Purity of
              <span className="block text-blue-200">European Alps</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover premium natural products sourced from the pristine mountains 
              and valleys of Europe. Experience authentic flavors preserved by nature.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Shop Collection
              </Link>
              <Link to="/about" className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                Our Story
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Alpine Harvest?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring you the finest natural products from Europe's most pristine regions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular selections from across Europe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center bg-gray-900 text-white hover:bg-black font-bold py-4 px-10 rounded-full text-lg transition duration-300">
              View All Products
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Origin Story */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&auto=format&fit=crop&q=80"
                alt="Swiss Farm"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From Alpine Farms to Your Home
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our journey begins in the heart of Europe, where generations of farmers 
                have cultivated the land with respect for nature. Each product tells a 
                story of tradition, quality, and passion.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-gray-700">Direct from European producers</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-gray-700">Sustainable farming practices</span>
                </div>
                <div className="flex items-center">
                  <FaStar className="w-5 h-5 text-yellow-400 mr-3" />
                  <span className="text-gray-700">No artificial additives</span>
                </div>
              </div>
              <Link to="/about" className="inline-block mt-8 text-blue-600 hover:text-blue-700 font-bold text-lg">
                Learn more about our journey →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Stay Connected with Alpine Harvest
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, seasonal specials, and stories from our farms.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-l-full text-gray-900 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-r-full font-bold transition duration-300"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
