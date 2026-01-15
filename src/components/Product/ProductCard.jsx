import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { toggleWishlist } from '../../store/slices/wishlistSlice';
import { FaStar, FaShoppingCart, FaEye, FaMapMarkerAlt, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);

  const isInWishlist = wishlistItems?.some((item) => item._id === product._id);

  const wishlistHandler = (e) => {
    e.preventDefault(); // Prevent navigating to product page
    if (!userInfo) {
      toast.error('Please login to add to wishlist');
      return;
    }
    dispatch(toggleWishlist(product._id));
    if (isInWishlist) {
      toast.info('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({
      productId: product._id,
      quantity: 1
    }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.origin && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
              <FaMapMarkerAlt className="w-3 h-3 mr-1 text-blue-600" />
              {product.origin}
            </span>
          )}
          {product.countInStock === 0 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={wishlistHandler}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-md text-gray-700 shadow-sm hover:bg-white hover:text-red-500 transition-all duration-300 transform hover:scale-110 z-10"
          title="Add to Wishlist"
        >
          {isInWishlist ? (
            <FaHeart className="w-5 h-5 text-red-500" />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
        </button>

        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center shadow-lg transition-all duration-300 ${product.countInStock === 0
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
              }`}
          >
            <FaShoppingCart className="w-4 h-4 mr-2" />
            {product.countInStock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="text-xs font-bold tracking-wider text-blue-600 uppercase">
            {product.category}
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-bold text-gray-700">{product.rating || 4.5}</span>
          </div>
        </div>

        <Link to={`/product/${product._id}`} className="block group-hover:text-blue-600 transition-colors duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-xl font-extrabold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {/* Placeholder for discount if we had it */}
          {/* <span className="text-sm text-gray-400 line-through">$99.00</span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
