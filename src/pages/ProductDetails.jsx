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
  CheckCircle2,
  Package,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";

import useProductStore from "../store/useProductStore";
import useCartStore from "../store/cartStore";
import ProductCard from "../components/products/ProductCard";

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
      <div className="container-custom py-24 text-center">
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
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8B5CF6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7C3AED]"
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

  const productCategoryKey = getCategoryKey(product.category);

  const relatedProducts = products
    .filter((item) => {
      return (
        String(item.id) !== String(product.id) &&
        getCategoryKey(item.category) === productCategoryKey &&
        item.status !== "Inactive"
      );
    })
    .slice(0, 4);

  const getCartVariant = () => {
    if (!variant) return undefined;

    return {
      ...variant,
      id: variant.id ?? selectedVariant,
    };
  };

  const validateProduct = () => {
    if (variants.length > 0 && !variant) {
      toast.error("Please select a package");
      return false;
    }

    if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
      toast.error("Product price is not available");
      return false;
    }

    return true;
  };

  const handleAddToCart = () => {
    if (!validateProduct()) return;

    addToCart(product, getCartVariant(), quantity);
    toast.success("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!validateProduct()) return;

    addToCart(product, getCartVariant(), quantity);
    navigate("/checkout");
  };

  return (
    <div className="container-custom py-6 sm:py-10">
      {/* Breadcrumb */}
      <div className="mb-5 flex flex-wrap items-center gap-2 text-xs text-[#AAA3C1]">
        <Link to="/" className="transition hover:text-white">
          Home
        </Link>

        <span>/</span>

        <Link to="/shop" className="transition hover:text-white">
          Shop
        </Link>

        <span>/</span>

        <span className="text-[#B99AFF]">{product.name}</span>
      </div>

      <Link
        to="/shop"
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#AAA3C1] transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Shop
      </Link>

      {/* Product Details */}
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div>
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
            {product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                {product.badge}
              </span>
            )}

            <div className="flex aspect-square items-center justify-center p-5 sm:p-8">
              <img
                src={
                  product.image ||
                  "https://placehold.co/600x600/211B3B/FFFFFF?text=AI-SaleBD"
                }
                alt={product.name}
                className="h-full w-full rounded-xl object-contain transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#11101C]/80 px-3 py-2 backdrop-blur-md">
              <Zap size={14} className="text-[#B99AFF]" />
              <span className="text-xs font-medium text-white">
                AI-SaleBD Digital Product
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B]/70 p-3">
            <ShieldCheck size={18} className="shrink-0 text-[#38BDF8]" />
            <p className="text-xs leading-5 text-[#AAA3C1]">
              Choose your package and proceed to checkout. Select your preferred
              payment method there.
            </p>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-1.5 text-xs font-semibold text-[#B99AFF]">
              {categoryName || "Digital Product"}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300">
              <CheckCircle2 size={13} />
              Confirm availability
            </span>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#AAA3C1]">
            {product.description ||
              "Explore this digital product from AI-SaleBD."}
          </p>

          {/* Price */}
          <div className="mt-7 rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/10 to-[#38BDF8]/5 p-5">
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
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-white">Select Package</h2>

                <span className="text-xs text-[#AAA3C1]">
                  {variants.length} options
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {variants.map((item, index) => {
                  const variantId = getVariantKey(item, index);
                  const isSelected = selectedVariant === variantId;

                  return (
                    <button
                      key={variantId}
                      type="button"
                      onClick={() => setSelectedVariant(variantId)}
                      aria-pressed={isSelected}
                      className={`relative rounded-xl border p-3 text-left transition ${
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

                      <span className="block pr-4 text-xs font-semibold text-white">
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
          <div className="mt-7">
            <h2 className="mb-3 text-sm font-bold text-white">Quantity</h2>

            <div className="inline-flex items-center gap-5 rounded-xl border border-white/10 bg-[#211B3B] p-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={17} />
              </button>

              <span className="min-w-5 text-center font-bold text-white">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= 99}
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={17} />
              </button>
            </div>

            <p className="mt-2 text-xs text-[#AAA3C1]">Maximum quantity: 99</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#8B5CF6] bg-[#8B5CF6]/10 px-6 py-4 text-sm font-bold text-[#B99AFF] transition hover:bg-[#8B5CF6] hover:text-white"
            >
              <ShoppingCart size={19} />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:brightness-110"
            >
              <ShoppingBag size={19} />
              Buy Now — ৳{formatPrice(totalPrice)}
            </button>
          </div>

          {/* Service Features */}
          <div className="mt-6 grid grid-cols-2 gap-3">
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
      <section className="mt-12 rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8B5CF6]/15">
            <Package size={21} className="text-[#B99AFF]" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-white">
              Product Description
            </h2>
            <p className="text-xs text-[#AAA3C1]">
              Learn more about this product
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-[#AAA3C1]">
          {product.description}
        </p>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B99AFF]">
                Explore More
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                Related Products
              </h2>
            </div>

            <Link
              to="/shop"
              className="text-xs font-semibold text-[#38BDF8] transition hover:text-white sm:text-sm"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
