import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";

// Scroll to top whenever route changes
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname, search, hash]);

  return null;
}

// Customer Layout
import MainLayout from "./components/layout/MainLayout";

// Customer Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import Category from "./pages/Category";
import SearchResults from "./pages/SearchResults";
import ResetPassword from "./pages/ResetPassword";
import Addresses from "./pages/Addresses";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Product Details Component
import ProductDetails from "./components/products/ProductDetails";

// Admin Layout & Pages
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Products from "./admin/pages/Products";
import AddProduct from "./admin/pages/AddProduct";
import Orders from "./admin/pages/Orders";
import OrderDetails from "./admin/pages/OrderDetails";
import EditProduct from "./admin/pages/EditProduct";
import Categories from "./admin/pages/Categories";

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />

      <Routes>
        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/:orderId" element={<OrderDetails />} />
          <Route path="categories" element={<Categories />} />
        </Route>

        {/* CUSTOMER ROUTES */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <MainLayout>
              <Shop />
            </MainLayout>
          }
        />

        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        <Route
          path="/category/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        {/* CATEGORY */}
        <Route
          path="/category/:slug"
          element={
            <MainLayout>
              <Category />
            </MainLayout>
          }
        />

        {/* SEARCH */}
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchResults />
            </MainLayout>
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />

        {/* ORDER SUCCESS */}
        <Route
          path="/order-success"
          element={
            <MainLayout>
              <OrderSuccess />
            </MainLayout>
          }
        />

        {/* MY ORDERS */}
        <Route
          path="/my-orders"
          element={
            <MainLayout>
              <MyOrders />
            </MainLayout>
          }
        />

        {/* AUTHENTICATION */}
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          }
        />

        <Route
          path="/reset-password"
          element={
            <MainLayout>
              <ResetPassword />
            </MainLayout>
          }
        />

        {/* ACCOUNT */}
        <Route
          path="/account"
          element={
            <MainLayout>
              <Account />
            </MainLayout>
          }
        />

        <Route
          path="/addresses"
          element={
            <MainLayout>
              <Addresses />
            </MainLayout>
          }
        />

        {/* INFORMATION PAGES */}
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        <Route
          path="/faq"
          element={
            <MainLayout>
              <FAQ />
            </MainLayout>
          }
        />

        <Route
          path="/refund-policy"
          element={
            <MainLayout>
              <RefundPolicy />
            </MainLayout>
          }
        />

        <Route
          path="/terms"
          element={
            <MainLayout>
              <Terms />
            </MainLayout>
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicy />
            </MainLayout>
          }
        />

        {/* NOT FOUND */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
