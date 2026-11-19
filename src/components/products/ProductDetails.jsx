import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  Zap,
  Package,
  Check,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

import useProductStore from "../../store/useProductStore";
import useCartStore from "../../store/cartStore";

const WHATSAPP_NUMBER = "8801648582639";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("");

  const safeProducts = Array.isArray(products) ? products : [];

  const product = safeProducts.find((item) => String(item.id) === String(id));

  // Product Not Found
  if (!product || product.status !== "Active") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#09090F] px-4 py-12 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10">
            <Package size={38} className="text-[#B99AFF]" />
          </div>

          <h2 className="text-2xl font-extrabold text-white">
            Product Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#AAA3C1]">
            এই Product টি পাওয়া যায়নি অথবা বর্তমানে Active নেই।
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#2563EB] px-6 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-purple-900/30"
          >
            <ShoppingBag size={17} />
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const variants = Array.isArray(product.variants) ? product.variants : [];

  const currentVariant = variants.find((variant) => {
    const variantName = typeof variant === "string" ? variant : variant.name;

    return variantName === selectedVariant;
  });

  const basePrice = Number(currentVariant?.price ?? product.price ?? 0);
  const totalPrice = basePrice * quantity;

  // Add Product to Cart
  const handleAddToCart = () => {
    if (variants.length > 0 && !selectedVariant) {
      toast.error("Please select a product variant");
      return;
    }

    addToCart(product, currentVariant, quantity);
    toast.success("Product added to cart!");
  };

  // Order Single Product via WhatsApp
  const handleWhatsAppOrder = () => {
    if (variants.length > 0 && !selectedVariant) {
      toast.error("Please select a product variant");
      return;
    }

    if (!Number.isFinite(basePrice) || basePrice <= 0) {
      toast.error("Product price is not available");
      return;
    }

    const variantName = currentVariant
      ? typeof currentVariant === "string"
        ? currentVariant
        : currentVariant.name
      : "Default";

    const message = `
Hello AI-SaleBD! I want to order this product.

Product: ${product.name}
Category: ${product.category || "N/A"}
Package / Variant: ${variantName}
Unit Price: ৳${basePrice.toLocaleString("en-BD")}
Quantity: ${quantity}
Total Price: ৳${totalPrice.toLocaleString("en-BD")}

Please confirm my order.

Thank you!
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#09090F] py-7 text-white sm:py-10 lg:py-12">
      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[#8F88A5] sm:text-sm">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="transition hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <span className="max-w-[180px] truncate text-[#C4A7FF]">
            {product.name}
          </span>
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-7 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-[#AAA3C1] transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="lg:sticky lg:top-8">
            <div className="group relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#211B3B] via-[#171426] to-[#10101A] sm:min-h-[420px] lg:min-h-[520px]">
              {/* Decorative Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/10 blur-[90px]" />

              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 max-h-[500px] w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105 sm:p-10"
                />
              ) : (
                <Package size={90} className="relative z-10 text-[#B99AFF]" />
              )}

              {/* Product Badge */}
              {product.badge && (
                <span className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#8B5CF6] px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-950/30 sm:left-5 sm:top-5">
                  <Sparkles size={14} />
                  {product.badge}
                </span>
              )}

              {/* Image Label */}
              <div className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[10px] font-semibold text-white/70 backdrop-blur-md">
                AI-SaleBD Marketplace
              </div>
            </div>

            {/* Image Caption */}
            <p className="mt-3 text-center text-xs text-[#77718D]">
              Explore product details and choose your preferred package.
            </p>
          </div>

          {/* Product Information */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#211B3B]/90 to-[#151323]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8">
            {/* Category */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 px-3 py-1.5">
              <Sparkles size={13} className="text-[#C4A7FF]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#C4A7FF] sm:text-xs">
                {product.category || "Digital Product"}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="mt-5 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-4 text-sm leading-7 text-[#AAA3C1] sm:text-base">
              {product.description ||
                "Explore this digital product from AI-SaleBD."}
            </p>

            {/* Price Card */}
            <div className="mt-7 rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-r from-[#8B5CF6]/10 to-[#2563EB]/5 p-4 sm:p-5">
              <p className="text-xs font-semibold text-[#AAA3C1]">
                Current Price
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  ৳{basePrice.toLocaleString("en-BD")}
                </span>

                {product.oldPrice && Number(product.oldPrice) > basePrice && (
                  <span className="text-base font-medium text-[#8F88A5] line-through">
                    ৳{Number(product.oldPrice).toLocaleString("en-BD")}
                  </span>
                )}
              </div>

              <p className="mt-2 text-[11px] text-[#AAA3C1]">
                Price may vary depending on the selected package.
              </p>
            </div>

            {/* Variant Selection */}
            {variants.length > 0 && (
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    Select Package / Variant
                  </h3>

                  {selectedVariant && (
                    <span className="text-xs font-medium text-[#B99AFF]">
                      Selected
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {variants.map((variant, index) => {
                    const variantName =
                      typeof variant === "string" ? variant : variant.name;

                    const variantPrice =
                      typeof variant === "string" ? null : variant.price;

                    const isSelected = selectedVariant === variantName;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedVariant(variantName)}
                        className={`flex min-h-[58px] items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-white shadow-lg shadow-purple-950/20"
                            : "border-white/10 bg-[#171426] text-[#AAA3C1] hover:border-[#8B5CF6]/50 hover:text-white"
                        }`}
                      >
                        <span className="text-sm font-semibold">
                          {variantName}
                        </span>

                        <span className="flex shrink-0 items-center gap-2">
                          {variantPrice !== null &&
                            variantPrice !== undefined && (
                              <span className="text-xs font-bold text-[#C4A7FF]">
                                ৳{Number(variantPrice).toLocaleString("en-BD")}
                              </span>
                            )}

                          {isSelected && (
                            <Check size={17} className="text-[#C4A7FF]" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {!selectedVariant && (
                  <p className="mt-3 text-xs text-[#C4A7FF]">
                    Please select a package before ordering.
                  </p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="mt-7">
              <h3 className="mb-3 text-sm font-bold text-white sm:text-base">
                Quantity
              </h3>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#171426] p-3">
                <div className="flex items-center overflow-hidden rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((previous) => Math.max(1, previous - 1))
                    }
                    disabled={quantity <= 1}
                    className="p-3 text-[#AAA3C1] transition hover:bg-[#8B5CF6]/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-12 text-center text-sm font-bold text-white">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((previous) => Math.min(99, previous + 1))
                    }
                    disabled={quantity >= 99}
                    className="p-3 text-[#AAA3C1] transition hover:bg-[#8B5CF6]/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8F88A5]">
                    Total Price
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-[#C4A7FF]">
                    ৳{totalPrice.toLocaleString("en-BD")}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/50 bg-[#8B5CF6]/10 px-4 py-3 text-sm font-bold text-[#C4A7FF] transition-all hover:border-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white hover:shadow-lg hover:shadow-purple-900/30"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] px-4 py-3 text-sm font-bold text-white transition-all hover:from-[#15803D] hover:to-[#166534] hover:shadow-lg hover:shadow-green-950/30"
              >
                <MessageCircle size={19} />
                Order via WhatsApp
              </button>
            </div>

            {/* Trust Features */}
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="mb-4 text-xs font-bold uppercase tracking-[1.5px] text-[#8F88A5]">
                Shopping Benefits
              </p>

              <div className="grid grid-cols-2 gap-x-3 gap-y-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={19} className="shrink-0 text-[#B99AFF]" />
                  <span className="text-xs font-medium text-[#C4BED5]">
                    Secure Order
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Zap size={19} className="shrink-0 text-[#B99AFF]" />
                  <span className="text-xs font-medium text-[#C4BED5]">
                    Digital Product
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Check size={19} className="shrink-0 text-[#B99AFF]" />
                  <span className="text-xs font-medium text-[#C4BED5]">
                    Easy Ordering
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MessageCircle
                    size={19}
                    className="shrink-0 text-[#B99AFF]"
                  />
                  <span className="text-xs font-medium text-[#C4BED5]">
                    WhatsApp Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#AAA3C1] transition hover:text-white"
          >
            Continue Shopping
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
