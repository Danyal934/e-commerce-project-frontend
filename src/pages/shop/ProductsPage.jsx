import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import ProductCard from '../../components/Product/ProductCard';
import { FaFilter, FaSortAmountDown, FaSearch } from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover premium natural products from Europe's most pristine regions
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSearch className="inline w-4 h-4 mr-2" />
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaFilter className="inline w-4 h-4 mr-2" />
                Category
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaSortAmountDown className="inline w-4 h-4 mr-2" />
                Sort By
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-gray-600">
              Showing <span className="font-bold">{filteredProducts.length}</span> of {products.length} products
            </p>
          </div>
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold py-3 px-8 rounded-lg transition duration-300">
                Load More Products
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
