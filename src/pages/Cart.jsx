import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingCart,
  Tag,
  ShieldCheck,
  TicketPercent,
  X,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useProductStore from "../store/useProductStore";
import { useTheme } from "../context/ThemeContext";

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

function Cart() {
  const { isDark } = useTheme();

  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const products = useProductStore((state) => state.products);

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
  const safeProducts = Array.isArray(products) ? products : [];

  const [coupon, setCoupon] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [removeItemId, setRemoveItemId] = useState(null);

  const unavailableItems = safeCartItems.filter((item) => {
    const currentProduct = safeProducts.find(
      (product) => String(product.id) === String(item.productId),
    );

    return (
      !currentProduct ||
      (currentProduct.status && currentProduct.status !== "Active")
    );
  });

  const hasUnavailableItems = unavailableItems.length > 0;

  const totalQuantity = safeCartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  const subtotal = safeCartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0,
  );

  const cardTheme = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white";

  const panelTheme = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white";

  const headingTheme = isDark ? "text-white" : "text-gray-900";

  const mutedTheme = isDark ? "text-gray-400" : "text-gray-500";

  const inputTheme = isDark
    ? "border-white/10 bg-[#0B0F0C] text-white placeholder:text-gray-600"
    : "border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400";

  // Coupon Handler
  const handleCoupon = (e) => {
    e.preventDefault();

    if (!coupon.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    toast("Coupon system will be available soon.", {
      icon: "🎟️",
    });
  };

  // Remove Product
  const handleRemove = (cartId) => {
    removeFromCart(cartId);
    setRemoveItemId(null);
    toast.success("Product removed from cart");
  };

  // Clear Cart
  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    toast.success("Cart cleared successfully");
  };

  // Empty Cart
  if (safeCartItems.length === 0) {
    return (
      <div className="container-custom flex min-h-[70vh] items-center justify-center py-16">
        <div
          className={`relative w-full max-w-md overflow-hidden rounded-3xl border px-6 py-12 text-center shadow-2xl ${panelTheme}`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-green-500/20 bg-green-500/10 shadow-lg shadow-green-950/10">
            <ShoppingCart size={42} className="text-green-500" />
          </div>

          <div className="relative mt-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-500">
              <Sparkles size={12} />
              AI-SaleBD Store
            </span>

            <h1
              className={`mt-5 text-2xl font-extrabold sm:text-3xl ${headingTheme}`}
            >
              Your Cart is Empty
            </h1>

            <p className={`mt-3 text-sm leading-7 ${mutedTheme}`}>
              Looks like you haven't added anything to your cart yet. Explore
              our premium digital products and find something you love.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={16} />
            </Link>

            <p className={`mt-6 text-xs ${mutedTheme}`}>
              Your Gateway to Premium AI Tools.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 sm:py-12">
      {/* Page Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            to="/shop"
            className={`inline-flex items-center gap-2 text-sm transition hover:text-green-500 ${mutedTheme}`}
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="mt-5 flex items-center gap-2">
            <span className="rounded-lg border border-green-500/20 bg-green-500/10 p-2 text-green-500">
              <ShoppingCart size={20} />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-500">
              Your Shopping Bag
            </span>
          </div>

          <h1
            className={`mt-3 text-2xl font-extrabold sm:text-3xl ${headingTheme}`}
          >
            Shopping Cart
          </h1>

          <p className={`mt-2 text-sm ${mutedTheme}`}>
            You have {totalQuantity} item(s) in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-semibold text-red-500 transition hover:bg-red-500/10"
        >
          <Trash2 size={15} />
          Clear Cart
        </button>
      </div>

      {/* Unavailable Warning */}
      {hasUnavailableItems && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-400" />

          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Some products are no longer available
            </h3>

            <p className="mt-1 text-xs leading-6 text-amber-100/70">
              {unavailableItems.length} product(s) in your cart are inactive or
              have been removed. Remove these products before proceeding to
              checkout.
            </p>
          </div>
        </div>
      )}

      {/* Cart Layout */}
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        {/* Cart Products */}
        <div className="space-y-4">
          {safeCartItems.map((item) => {
            const isUnavailable = unavailableItems.some(
              (unavailable) => unavailable.cartId === item.cartId,
            );

            const itemQuantity = Number(item.quantity || 1);

            return (
              <div
                key={item.cartId}
                className={`group relative flex gap-3 overflow-hidden rounded-2xl border p-3 transition duration-300 hover:border-green-500/30 sm:gap-5 sm:p-5 ${
                  isUnavailable ? "border-amber-400/40 opacity-80" : cardTheme
                }`}
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.productId}`}
                  className={`h-24 w-24 shrink-0 overflow-hidden rounded-xl border sm:h-32 sm:w-32 ${
                    isDark
                      ? "border-white/5 bg-[#0B0F0C]"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-green-500">
                      <ShoppingBag size={30} />
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-green-500">
                        {item.category}
                      </p>

                      <Link
                        to={`/product/${item.productId}`}
                        className={`line-clamp-2 text-sm font-bold transition hover:text-green-500 sm:text-base ${headingTheme}`}
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1 text-xs text-green-500">
                        Package: {item.variantName || "Default"}
                      </p>

                      {isUnavailable && (
                        <span className="mt-2 inline-block rounded-md bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-500">
                          Currently Unavailable
                        </span>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => setRemoveItemId(item.cartId)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    {/* Quantity */}
                    <div
                      className={`flex items-center gap-3 rounded-xl border p-1 ${
                        isDark
                          ? "border-white/10 bg-[#0B0F0C]"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <button
                        type="button"
                        disabled={itemQuantity <= 1}
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            Math.max(1, itemQuantity - 1),
                          )
                        }
                        aria-label="Decrease quantity"
                        className={`rounded-lg p-1.5 transition hover:bg-green-500/10 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-30 ${headingTheme}`}
                      >
                        <Minus size={14} />
                      </button>

                      <span
                        className={`min-w-5 text-center text-sm font-bold ${headingTheme}`}
                      >
                        {itemQuantity}
                      </span>

                      <button
                        type="button"
                        disabled={itemQuantity >= 99}
                        onClick={() =>
                          updateQuantity(
                            item.cartId,
                            Math.min(99, itemQuantity + 1),
                          )
                        }
                        aria-label="Increase quantity"
                        className={`rounded-lg p-1.5 transition hover:bg-green-500/10 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-30 ${headingTheme}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className={`text-[10px] ${mutedTheme}`}>Item Total</p>

                      <p
                        className={`text-sm font-extrabold sm:text-base ${headingTheme}`}
                      >
                        {formatPrice(Number(item.price || 0) * itemQuantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add More Products */}
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-green-500 transition hover:text-green-400"
          >
            <Plus size={16} />
            Add More Products
          </Link>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-24">
          <div
            className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${panelTheme}`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-extrabold ${headingTheme}`}>
                  Order Summary
                </h2>

                <span className="rounded-lg border border-green-500/20 bg-green-500/10 p-2 text-green-500">
                  <ShoppingBag size={17} />
                </span>
              </div>

              <p className={`mt-1 text-xs ${mutedTheme}`}>
                Review your order before checkout
              </p>

              {/* Coupon */}
              <form onSubmit={handleCoupon} className="mt-6">
                <label
                  className={`mb-2 flex items-center gap-2 text-xs font-semibold ${headingTheme}`}
                >
                  <TicketPercent size={16} className="text-green-500" />
                  Coupon Code
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className={`min-w-0 flex-1 rounded-xl border px-3 py-3 text-xs outline-none transition focus:border-green-500 ${inputTheme}`}
                  />

                  <button
                    type="submit"
                    className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 text-xs font-bold text-green-500 transition hover:bg-green-500/20"
                  >
                    Apply
                  </button>
                </div>

                <p className={`mt-2 text-[10px] ${mutedTheme}`}>
                  Coupon discounts will be enabled soon.
                </p>
              </form>

              <div
                className={`my-5 border-t ${
                  isDark ? "border-white/10" : "border-gray-100"
                }`}
              />

              {/* Price Details */}
              <div className="space-y-4">
                <div
                  className={`flex justify-between gap-3 text-sm ${mutedTheme}`}
                >
                  <span>Products ({totalQuantity})</span>

                  <span className={`font-semibold ${headingTheme}`}>
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div
                  className={`flex justify-between gap-3 text-sm ${mutedTheme}`}
                >
                  <span>Delivery Fee</span>

                  <span className="font-semibold text-green-500">Free</span>
                </div>

                <div
                  className={`flex justify-between gap-3 text-sm ${mutedTheme}`}
                >
                  <span>Discount</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              <div
                className={`my-5 border-t ${
                  isDark ? "border-white/10" : "border-gray-100"
                }`}
              />

              {/* Total Amount */}
              <div className="flex items-center justify-between gap-3">
                <span className={`text-base font-bold ${headingTheme}`}>
                  Total Amount
                </span>

                <span className="text-xl font-extrabold text-green-500">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Proceed to Checkout */}
              <Link
                to="/checkout"
                aria-disabled={hasUnavailableItems}
                onClick={(e) => {
                  if (hasUnavailableItems) {
                    e.preventDefault();
                    toast.error("Please remove unavailable products first");
                  }
                }}
                className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-green-700 ${
                  hasUnavailableItems ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <ShoppingBag size={19} />

                {hasUnavailableItems
                  ? "Remove Unavailable Products First"
                  : "Proceed to Checkout"}
              </Link>

              <p
                className={`mt-3 text-center text-[10px] leading-5 ${mutedTheme}`}
              >
                Select bKash, Nagad or Rocket on the checkout page.
              </p>

              <div
                className={`mt-5 flex items-center justify-center gap-2 text-center text-[11px] ${mutedTheme}`}
              >
                <ShieldCheck size={15} className="shrink-0 text-green-500" />
                Secure order processing
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-4 rounded-2xl border border-green-500/15 bg-green-500/5 p-4">
            <div className="flex items-start gap-3">
              <Tag size={17} className="mt-0.5 shrink-0 text-green-500" />

              <div>
                <p className={`text-xs font-bold ${headingTheme}`}>
                  Need help with your order?
                </p>

                <p className={`mt-1 text-xs leading-5 ${mutedTheme}`}>
                  Contact our support team if you have any questions about a
                  product or package.
                </p>

                <a
                  href="https://wa.me/8801648582639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-bold text-green-500 hover:underline"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Clear Cart Confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${panelTheme}`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <Trash2 size={22} />
            </div>

            <h3 className={`text-lg font-bold ${headingTheme}`}>
              Clear your cart?
            </h3>

            <p className={`mt-2 text-sm leading-6 ${mutedTheme}`}>
              Are you sure you want to remove all products from your cart?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition hover:bg-green-500/5 ${
                  isDark
                    ? "border-white/10 text-white"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleClearCart}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Product Confirmation */}
      {removeItemId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-2xl border p-6 shadow-2xl ${panelTheme}`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-bold ${headingTheme}`}>
                Remove Product?
              </h3>

              <button
                type="button"
                onClick={() => setRemoveItemId(null)}
                aria-label="Close confirmation"
                className={`rounded-lg p-2 transition hover:bg-red-500/10 hover:text-red-500 ${mutedTheme}`}
              >
                <X size={18} />
              </button>
            </div>

            <p className={`mt-2 text-sm leading-6 ${mutedTheme}`}>
              Are you sure you want to remove this product from your cart?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setRemoveItemId(null)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-bold transition hover:bg-green-500/5 ${
                  isDark
                    ? "border-white/10 text-white"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleRemove(removeItemId)}
                className="flex-1 rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
