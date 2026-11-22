import { useMemo, useState } from "react";
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
  MessageCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import useCartStore from "../store/cartStore";
import useProductStore from "../store/useProductStore";

const WHATSAPP_NUMBER = "8801648582639";

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

const safeQuantity = (quantity) => {
  const value = Math.floor(Number(quantity));
  return Number.isFinite(value) ? Math.max(1, Math.min(99, value)) : 1;
};

function Cart() {
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

  // Validate cart items against current product information
  const validatedItems = useMemo(() => {
    return safeCartItems.map((item) => {
      const currentProduct = safeProducts.find(
        (product) => String(product.id) === String(item.productId),
      );

      const quantity = safeQuantity(item.quantity);

      if (!currentProduct || currentProduct.status !== "Active") {
        return {
          ...item,
          currentProduct,
          currentVariant: null,
          currentPrice: 0,
          quantity,
          issue: "unavailable",
        };
      }

      const variants = Array.isArray(currentProduct.variants)
        ? currentProduct.variants
        : [];

      let currentVariant = null;

      if (variants.length > 0) {
        currentVariant = variants.find(
          (variant) =>
            String(variant.id ?? variant.name) === String(item.variantId) ||
            String(variant.name) === String(item.variantName),
        );

        if (!currentVariant) {
          return {
            ...item,
            currentProduct,
            currentVariant: null,
            currentPrice: 0,
            quantity,
            issue: "variant-unavailable",
          };
        }
      }

      const currentPrice = Number(
        currentVariant?.price ?? currentProduct.price,
      );

      if (!Number.isFinite(currentPrice) || currentPrice < 0) {
        return {
          ...item,
          currentProduct,
          currentVariant,
          currentPrice: 0,
          quantity,
          issue: "invalid-price",
        };
      }

      const stockValue = currentVariant
        ? currentVariant.stock
        : currentProduct.stock;

      const stock = Number(stockValue);
      const hasStockLimit =
        stockValue !== undefined &&
        stockValue !== null &&
        stockValue !== "" &&
        Number.isFinite(stock);

      if (hasStockLimit && stock <= 0) {
        return {
          ...item,
          currentProduct,
          currentVariant,
          currentPrice,
          quantity,
          issue: "out-of-stock",
        };
      }

      if (hasStockLimit && quantity > stock) {
        return {
          ...item,
          currentProduct,
          currentVariant,
          currentPrice,
          quantity,
          availableStock: Math.floor(stock),
          issue: "insufficient-stock",
        };
      }

      return {
        ...item,
        currentProduct,
        currentVariant,
        currentPrice,
        quantity,
        issue: null,
      };
    });
  }, [safeCartItems, safeProducts]);

  const unavailableItems = validatedItems.filter((item) => item.issue !== null);

  const hasUnavailableItems = unavailableItems.length > 0;

  const totalQuantity = validatedItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = validatedItems.reduce((total, item) => {
    if (item.issue) return total;

    return total + item.currentPrice * item.quantity;
  }, 0);

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

  // WhatsApp Cart Checkout
  const handleWhatsAppCheckout = () => {
    if (safeCartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (hasUnavailableItems) {
      toast.error("Please review unavailable products or stock first");
      return;
    }

    const orderLines = validatedItems.map((item, index) => {
      const itemTotal = item.currentPrice * item.quantity;

      return [
        `${index + 1}. ${item.currentProduct.name}`,
        `   Package: ${item.currentVariant?.name || "Default"}`,
        `   Price: ${formatPrice(item.currentPrice)}`,
        `   Quantity: ${item.quantity}`,
        `   Subtotal: ${formatPrice(itemTotal)}`,
      ].join("\n");
    });

    const currentSubtotal = validatedItems.reduce(
      (total, item) => total + item.currentPrice * item.quantity,
      0,
    );

    const message = [
      "Hello AI-SaleBD! I want to place an order.",
      "",
      "----- ORDER DETAILS -----",
      "",
      ...orderLines,
      "",
      "-------------------------",
      `Total Products: ${totalQuantity}`,
      `Grand Total: ${formatPrice(currentSubtotal)}`,
      "",
      "Please confirm my order.",
      "",
      "Thank you!",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  // Empty Cart
  if (safeCartItems.length === 0) {
    return (
      <div className="container-custom flex min-h-[70vh] items-center justify-center py-16">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#211B3B] px-6 py-12 text-center shadow-2xl shadow-purple-950/20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl" />

          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-[#8B5CF6]/20 bg-[#2B2149] shadow-lg shadow-purple-950/20">
            <ShoppingCart size={42} className="text-[#B99AFF]" />
          </div>

          <div className="relative mt-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-300">
              <Sparkles size={12} />
              AI-SaleBD Store
            </span>

            <h1 className="mt-5 text-2xl font-extrabold text-white sm:text-3xl">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-sm leading-7 text-[#AAA3C1]">
              Looks like you haven't added anything to your cart yet. Explore
              our premium digital products and find something you love.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:shadow-purple-500/20"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={16} />
            </Link>

            <p className="mt-6 text-xs text-[#77718D]">
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
            className="inline-flex items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <div className="mt-5 flex items-center gap-2">
            <span className="rounded-lg border border-purple-400/20 bg-purple-500/10 p-2 text-[#B99AFF]">
              <ShoppingCart size={20} />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B99AFF]">
              Your Shopping Bag
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-[#AAA3C1]">
            You have {totalQuantity} item(s) in your cart
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowClearConfirm(true)}
          className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-400/10"
        >
          <Trash2 size={15} />
          Clear Cart
        </button>
      </div>

      {/* Unavailable Product Warning */}
      {hasUnavailableItems && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-400" />

          <div>
            <h3 className="text-sm font-bold text-amber-300">
              Some cart items need attention
            </h3>

            <p className="mt-1 text-xs leading-6 text-[#AAA3C1]">
              {unavailableItems.length} cart item(s) are unavailable, have
              changed packages, or have insufficient stock. Please review these
              items before checkout.
            </p>
          </div>
        </div>
      )}

      {/* Cart Layout */}
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        {/* Cart Products */}
        <div className="space-y-4">
          {validatedItems.map((item) => {
            const isUnavailable = Boolean(item.issue);

            return (
              <div
                key={item.cartId}
                className={`group relative flex gap-3 overflow-hidden rounded-2xl border bg-[#211B3B] p-3 transition duration-300 hover:border-purple-400/30 sm:gap-5 sm:p-5 ${
                  isUnavailable
                    ? "border-amber-400/40 opacity-80"
                    : "border-white/10"
                }`}
              >
                {/* Product Image */}
                <Link
                  to={`/product/${item.productId}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/5 bg-[#11101C] sm:h-32 sm:w-32"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-purple-400">
                      <ShoppingBag size={30} />
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#38BDF8]">
                        {item.category}
                      </p>

                      <Link
                        to={`/product/${item.productId}`}
                        className="line-clamp-2 text-sm font-bold text-white transition hover:text-[#B99AFF] sm:text-base"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-1 text-xs text-[#B99AFF]">
                        Package: {item.variantName || "Default"}
                      </p>

                      {isUnavailable && (
                        <span className="mt-2 inline-block rounded-md bg-amber-400/10 px-2 py-1 text-[10px] font-bold text-amber-300">
                          {item.issue === "unavailable" &&
                            "Product Unavailable"}
                          {item.issue === "variant-unavailable" &&
                            "Package Unavailable"}
                          {item.issue === "invalid-price" && "Invalid Price"}
                          {item.issue === "out-of-stock" && "Out of Stock"}
                          {item.issue === "insufficient-stock" &&
                            `Only ${item.availableStock} available`}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setRemoveItemId(item.cartId)}
                      aria-label={`Remove ${item.name}`}
                      className="shrink-0 rounded-lg p-2 text-[#AAA3C1] transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#11101C]/60 p-1">
                      <button
                        type="button"
                        disabled={item.quantity <= 1}
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                        className="rounded-lg p-1.5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-5 text-center text-sm font-bold text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        disabled={item.quantity >= 99}
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="rounded-lg p-1.5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-[10px] text-[#AAA3C1]">
                        Unit Price: {formatPrice(item.currentPrice)}
                      </p>

                      <p className="text-sm font-extrabold text-white sm:text-base">
                        {formatPrice(item.currentPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-[#B99AFF] transition hover:text-white"
          >
            <Plus size={16} />
            Add More Products
          </Link>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-white">
                  Order Summary
                </h2>

                <span className="rounded-lg border border-purple-400/20 bg-purple-500/10 p-2 text-[#B99AFF]">
                  <ShoppingBag size={17} />
                </span>
              </div>

              <p className="mt-1 text-xs text-[#AAA3C1]">
                Review your order before checkout
              </p>

              {/* Coupon */}
              <form onSubmit={handleCoupon} className="mt-6">
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-white">
                  <TicketPercent size={16} className="text-[#B99AFF]" />
                  Coupon Code
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#11101C] px-3 py-3 text-xs text-white outline-none placeholder:text-[#77718D] transition focus:border-[#8B5CF6]"
                  />

                  <button
                    type="submit"
                    className="rounded-xl border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 px-4 text-xs font-bold text-[#B99AFF] transition hover:bg-[#8B5CF6]/20"
                  >
                    Apply
                  </button>
                </div>

                <p className="mt-2 text-[10px] text-[#AAA3C1]">
                  Coupon discounts will be enabled soon.
                </p>
              </form>

              <div className="my-5 border-t border-white/10" />

              {/* Price Details */}
              <div className="space-y-4">
                <div className="flex justify-between gap-3 text-sm text-[#AAA3C1]">
                  <span>Products ({totalQuantity})</span>

                  <span className="font-semibold text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm text-[#AAA3C1]">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-[#38BDF8]">Free</span>
                </div>

                <div className="flex justify-between gap-3 text-sm text-[#AAA3C1]">
                  <span>Discount</span>
                  <span>{formatPrice(0)}</span>
                </div>
              </div>

              <div className="my-5 border-t border-white/10" />

              <div className="flex items-center justify-between gap-3">
                <span className="text-base font-bold text-white">
                  Total Amount
                </span>

                <span className="text-xl font-extrabold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* WhatsApp Checkout */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                disabled={hasUnavailableItems}
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-green-950/20 transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:opacity-60"
              >
                <MessageCircle size={19} />
                {hasUnavailableItems
                  ? "Review Cart Items First"
                  : "Checkout via WhatsApp"}
              </button>

              <p className="mt-3 text-center text-[10px] leading-5 text-[#AAA3C1]">
                You will be redirected to WhatsApp to confirm your order.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2 text-center text-[11px] text-[#AAA3C1]">
                <ShieldCheck size={15} className="shrink-0 text-[#38BDF8]" />
                Secure order processing
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="mt-4 rounded-2xl border border-[#38BDF8]/15 bg-[#38BDF8]/5 p-4">
            <div className="flex items-start gap-3">
              <Tag size={17} className="mt-0.5 shrink-0 text-[#38BDF8]" />

              <div>
                <p className="text-xs font-bold text-white">
                  Need help with your order?
                </p>

                <p className="mt-1 text-xs leading-5 text-[#AAA3C1]">
                  Contact our support team if you have any questions about a
                  product or package.
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-bold text-[#38BDF8] hover:underline"
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
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#211B3B] p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 size={22} />
            </div>

            <h3 className="text-lg font-bold text-white">Clear your cart?</h3>

            <p className="mt-2 text-sm leading-6 text-[#AAA3C1]">
              Are you sure you want to remove all products from your cart?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5"
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
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#211B3B] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Remove Product?</h3>

              <button
                type="button"
                onClick={() => setRemoveItemId(null)}
                aria-label="Close confirmation"
                className="rounded-lg p-2 text-[#AAA3C1] transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-2 text-sm leading-6 text-[#AAA3C1]">
              Are you sure you want to remove this product from your cart?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setRemoveItemId(null)}
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/5"
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
