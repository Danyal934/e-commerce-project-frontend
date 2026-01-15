import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ChatWidget from './chatbot/pages/ChatWidget'; // Chatbot widget added

// Pages
import HomePage from './pages/shop/HomePage';
import ProductsPage from './pages/shop/ProductsPage';
import ProductPage from './pages/shop/ProductPage';
import CartPage from './pages/shop/CartPage';
import CheckoutPage from './pages/shop/CheckoutPage';
import OrderSuccessPage from './pages/user/OrderSuccessPage';
import AboutPage from './pages/general/AboutPage';
import ContactPage from './pages/general/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WishlistPage from './pages/user/WishlistPage';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public/Shop Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* User Routes */}
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
            </Routes>
          </main>
          <Footer />
          
          {/* Chatbot Widget - Appears on all pages */}
          <ChatWidget />
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;