import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  CheckCircle2,
  Package,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

import useProductStore from "../store/useProductStore";
import useCartStore from "../store/cartStore";
import ProductCard from "../components/products/ProductCard";

const WHATSAPP_NUMBER = "8801648582639";

const formatPrice = (price) => Number(price || 0).toLocaleString("en-BD");

const getVariantKey = (variant, index) =>
  String(variant.id ?? variant.name ?? index);

const getCategoryName = (category) => {
  if (typeof category === "string") return category;

  if (category && typeof category === "object") {
    return category.name || category.title || "";
  }

  return "";
};

const getCategoryKey = (category) => {
  if (category && typeof category === "object") {
    return String(category.slug || category.name || category.title || "")
      .trim()
      .toLowerCase();
  }

  return String(category || "")
    .trim()
    .toLowerCase();
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products = useProductStore((state) => state.products);
  const addToCart = useCartStore((state) => state.addToCart);

  const product = products.find((item) => String(item.id) === String(id));

  const variants = Array.isArray(product?.variants) ? product.variants : [];

  const [selectedVariant, setSelectedVariant] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedVariant(variants.length ? getVariantKey(variants[0], 0) : "");
    setQuantity(1);
  }, [id, product]);

  if (!product || product.status === "Inactive") {
    return (
      <div className="container-custom py-20 text-center sm:py-24">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#211B3B]">
          <Package size={38} className="text-[#B99AFF]" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-white">
          Product Not Found
        </h1>

        <p className="mt-2 text-sm text-[#AAA3C1]">
          Sorry, this product is not available.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7C3AED]"
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>
      </div>
    );
  }

  const variant = variants.find(
    (item, index) => getVariantKey(item, index) === selectedVariant,
  );

  const unitPrice = Number(variant?.price ?? product.price ?? 0);
  const totalPrice = unitPrice * quantity;
  const categoryName = getCategoryName(product.category);

  // Related products
  const productCategoryKey = getCategoryKey(product.category);

  const relatedProducts = products
    .filter((item) => {
      if (
        !item ||
        String(item.id) === String(product.id) ||
        item.status === "Inactive"
      ) {
        return false;
      }

      return (
        getCategoryKey(item.category) === productCategoryKey &&
        Boolean(productCategoryKey)
      );
    })
    .slice(0, 4);

  // Prepare selected variant for cart
  const getCartVariant = () => {
    if (!variant) return undefined;

    return {
      ...variant,
      id: variant.id ?? selectedVariant,
    };
  };

  // Add to cart
  const handleAddToCart = () => {
    addToCart(product, getCartVariant(), quantity);
    toast.success("Product added to cart!");
  };

  // Buy now
  const handleBuyNow = () => {
    addToCart(product, getCartVariant(), quantity);
    navigate("/cart");
  };

  // WhatsApp order
  const handleOrder = () => {
    const message = [
      "Hello AI-SaleBD!",
      "",
      "I want to order this product:",
      "",
      `Product: ${product.name}`,
      `Category: ${categoryName || "N/A"}`,
      `Package: ${variant?.name || "Default"}`,
      `Quantity: ${quantity}`,
      `Unit Price: ৳${formatPrice(unitPrice)}`,
      `Total Price: ৳${formatPrice(totalPrice)}`,
      "",
      "Please confirm availability and ordering details.",
      "",
      "Thank you.",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container-custom min-h-screen pb-10 pt-5 sm:py-10">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-[#AAA3C1] sm:mb-5 sm:text-xs">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>

        <span>/</span>

        <Link to="/shop" className="transition hover:text-white">
          Shop
        </Link>

        <span>/</span>

        <span className="max-w-[180px] truncate text-[#B99AFF] sm:max-w-none">
          {product.name}
        </span>
      </div>

      <Link
        to="/shop"
        className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-white sm:mb-6"
      >
        <ArrowLeft size={17} />
        Back to Shop
      </Link>

      {/* Product Details */}
      <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="min-w-0">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
            {product.badge && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-3 py-1.5 text-[10px] font-bold text-white shadow-lg sm:left-4 sm:top-4 sm:text-xs">
                {product.badge}
              </span>
            )}

            <div className="flex aspect-square items-center justify-center p-4 sm:p-8">
              <img
                src={
                  product.image ||
                  "https://placehold.co/600x600/211B3B/FFFFFF?text=AI-SaleBD"
                }
                alt={product.name || "Product"}
                className="h-full w-full rounded-xl object-contain transition duration-500 sm:group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/10 bg-[#11101C]/80 px-3 py-2 backdrop-blur-md sm:bottom-4 sm:left-4">
              <Zap size={14} className="text-[#B99AFF]" />

              <span className="text-[10px] font-medium text-white sm:text-xs">
                AI-SaleBD Digital Product
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-xl border border-white/10 bg-[#211B3B]/70 p-3">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#38BDF8]" />

            <p className="text-xs leading-5 text-[#AAA3C1]">
              Order securely through AI-SaleBD. Confirm product availability and
              delivery details before payment.
            </p>
          </div>
        </div>

        {/* Product Information */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {categoryName && (
              <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1.5 text-[11px] font-semibold text-[#B99AFF] sm:text-xs">
                {categoryName}
              </span>
            )}

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-[11px] font-medium text-amber-300 sm:text-xs">
              <CheckCircle2 size={13} />
              Confirm availability
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:mt-5 sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          {product.description && (
            <p className="mt-3 text-sm leading-7 text-[#AAA3C1] sm:mt-4">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="mt-5 rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/10 to-[#38BDF8]/5 p-4 sm:mt-7 sm:p-5">
            <p className="text-xs font-medium text-[#AAA3C1]">Total Price</p>

            <div className="mt-1 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white sm:text-4xl">
                ৳{formatPrice(totalPrice)}
              </span>

              {product.oldPrice && quantity === 1 && !variant && (
                <span className="text-sm text-[#AAA3C1] line-through">
                  ৳{formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            <p className="mt-2 text-xs text-[#AAA3C1]">
              ৳{formatPrice(unitPrice)} × {quantity} quantity
            </p>
          </div>

          {/* Package Selection */}
          {variants.length > 0 && (
            <div className="mt-6 sm:mt-7">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-white">Select Package</h2>

                <span className="text-xs text-[#AAA3C1]">
                  {variants.length} options
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
                {variants.map((item, index) => {
                  const variantId = getVariantKey(item, index);
                  const isSelected = selectedVariant === variantId;

                  return (
                    <button
                      key={variantId}
                      type="button"
                      onClick={() => setSelectedVariant(variantId)}
                      aria-pressed={isSelected}
                      className={`relative min-h-[76px] rounded-xl border p-3 text-left transition ${
                        isSelected
                          ? "border-[#8B5CF6] bg-[#8B5CF6]/15 shadow-lg shadow-purple-500/10"
                          : "border-white/10 bg-[#211B3B] hover:border-[#8B5CF6]/50"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle2
                          size={16}
                          className="absolute right-2 top-2 text-[#B99AFF]"
                        />
                      )}

                      <span className="block break-words pr-4 text-xs font-semibold text-white">
                        {item.name}
                      </span>

                      <span className="mt-3 block text-sm font-bold text-[#B99AFF]">
                        ৳{formatPrice(item.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6 sm:mt-7">
            <h2 className="mb-3 text-sm font-bold text-white">Quantity</h2>

            <div className="inline-flex min-h-12 items-center gap-4 rounded-xl border border-white/10 bg-[#211B3B] p-1.5 sm:gap-5 sm:p-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={17} />
              </button>

              <span className="min-w-6 text-center font-bold text-white">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= 99}
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={17} />
              </button>
            </div>

            <p className="mt-2 text-xs text-[#AAA3C1]">Maximum quantity: 99</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3 sm:mt-8">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#8B5CF6] bg-[#8B5CF6]/10 px-5 py-3.5 text-sm font-bold text-[#B99AFF] transition hover:bg-[#8B5CF6] hover:text-white"
            >
              <ShoppingCart size={19} />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
            >
              <ShoppingBag size={19} />
              Buy Now — ৳{formatPrice(totalPrice)}
            </button>

            <button
              type="button"
              onClick={handleOrder}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-3.5 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366]/20"
            >
              <MessageCircle size={19} />
              Order via WhatsApp
            </button>
          </div>

          {/* Service Features */}
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] p-3">
              <ShieldCheck size={19} className="shrink-0 text-[#38BDF8]" />

              <span className="text-[11px] text-[#AAA3C1] sm:text-xs">
                Secure Ordering
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] p-3">
              <Truck size={19} className="shrink-0 text-[#38BDF8]" />

              <span className="text-[11px] text-[#AAA3C1] sm:text-xs">
                Delivery Support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      {product.description && (
        <section className="mt-10 rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:mt-12 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15">
              <Package size={21} className="text-[#B99AFF]" />
            </div>

            <div>
              <h2 className="text-base font-bold text-white sm:text-lg">
                Product Description
              </h2>

              <p className="text-xs text-[#AAA3C1]">
                Learn more about this product
              </p>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#AAA3C1] sm:mt-5">
            {product.description}
          </p>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-10 sm:mt-14">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B99AFF] sm:text-xs">
                Explore More
              </p>

              <h2 className="mt-1.5 text-xl font-extrabold text-white sm:mt-2 sm:text-2xl">
                Related Products
              </h2>
            </div>

            <Link
              to="/shop"
              className="shrink-0 text-xs font-semibold text-[#38BDF8] transition hover:text-white sm:text-sm"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
