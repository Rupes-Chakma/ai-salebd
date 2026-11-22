import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ImageOff,
  Zap,
  ShieldCheck,
  Headset,
  Wallet,
  CheckCircle2,
  MessageCircle,
  ChevronDown,
  HelpCircle,
  Star,
} from "lucide-react";

import FeaturedProducts from "../components/home/FeaturedProducts";
import CategorySection from "../components/home/CategorySection";
import useProductStore from "../store/useProductStore";

const WHATSAPP_NUMBER = "8801648582639";
const SLIDE_INTERVAL = 4500;
const SWIPE_THRESHOLD = 45;

const benefits = [
  { icon: Zap, title: "Fast Delivery", description: "Quick order processing" },
  {
    icon: ShieldCheck,
    title: "Secure Ordering",
    description: "Simple ordering process",
  },
  {
    icon: Wallet,
    title: "Affordable Price",
    description: "Budget-friendly products",
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "We're here to help",
  },
];

const reasons = [
  {
    icon: CheckCircle2,
    title: "Easy Ordering",
    description:
      "Browse your preferred digital products and place your order easily.",
  },
  {
    icon: ShieldCheck,
    title: "Personal Support",
    description:
      "Get assistance from our support team throughout the ordering process.",
  },
  {
    icon: Wallet,
    title: "Affordable Options",
    description:
      "Explore digital products with pricing designed for different budgets.",
  },
];

const faqs = [
  {
    question: "How can I order a product?",
    answer:
      "Browse the Shop or Homepage, select your preferred product, and follow the available ordering instructions.",
  },
  {
    question: "How can I contact AI-SaleBD?",
    answer:
      "You can contact our support team through the WhatsApp support button available on the website.",
  },
  {
    question: "How will I receive my digital product?",
    answer:
      "Delivery details will be confirmed through the order communication channel after your order is reviewed.",
  },
  {
    question: "Can I ask questions before ordering?",
    answer:
      "Yes. Contact our support team through WhatsApp if you need product information or ordering assistance.",
  },
];

function Home() {
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);

  const activeProducts = Array.isArray(products)
    ? products.filter((product) => product && product.status === "Active")
    : [];

  const sliderProducts = activeProducts;

  const bestSellerProducts = activeProducts
    .filter(
      (product) => String(product.badge || "").toLowerCase() === "popular",
    )
    .slice(0, 4);

  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const mouseStartX = useRef(0);
  const isDragging = useRef(false);
  const didSwipe = useRef(false);

  const safeActiveSlide =
    sliderProducts.length > 0 ? activeSlide % sliderProducts.length : 0;

  const currentProduct = sliderProducts[safeActiveSlide];

  const nextSlide = useCallback(() => {
    if (sliderProducts.length > 1) {
      setActiveSlide((current) => (current + 1) % sliderProducts.length);
    }
  }, [sliderProducts.length]);

  const previousSlide = useCallback(() => {
    if (sliderProducts.length > 1) {
      setActiveSlide(
        (current) =>
          (current - 1 + sliderProducts.length) % sliderProducts.length,
      );
    }
  }, [sliderProducts.length]);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    setActiveSlide(0);
  }, [sliderProducts.length]);

  // Auto Slide
  useEffect(() => {
    if (sliderProducts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % sliderProducts.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [sliderProducts.length, isPaused]);

  // Mobile Touch Swipe
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = touchStartX.current - endX;
    const diffY = touchStartY.current - endY;

    if (
      Math.abs(diffX) > SWIPE_THRESHOLD &&
      Math.abs(diffX) > Math.abs(diffY)
    ) {
      didSwipe.current = true;

      if (diffX > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      setTimeout(() => {
        didSwipe.current = false;
      }, 300);
    }

    setIsPaused(false);
  };

  // Desktop Mouse Drag
  const handleMouseDown = (event) => {
    if (event.button !== 0) return;

    mouseStartX.current = event.clientX;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleMouseUp = (event) => {
    if (!isDragging.current) return;

    const distance = mouseStartX.current - event.clientX;

    if (Math.abs(distance) > SWIPE_THRESHOLD) {
      didSwipe.current = true;

      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

      setTimeout(() => {
        didSwipe.current = false;
      }, 300);
    }

    isDragging.current = false;
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      setIsPaused(false);
    }
  };

  const handleSlideClick = (event) => {
    if (didSwipe.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.currentTarget.search.value.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleWhatsApp = () => {
    const message = "Hello AI-SaleBD! I need some help.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="overflow-x-clip">
      {/* HERO SLIDER */}
      <section className="relative pb-3 pt-2 sm:pb-7 sm:pt-6">
        <div className="container-custom">
          {currentProduct ? (
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B] shadow-xl shadow-purple-950/20 touch-pan-y select-none sm:rounded-3xl"
            >
              <div className="pointer-events-none absolute -left-20 -top-24 h-52 w-52 rounded-full bg-purple-600/20 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-blue-500/15 blur-[85px]" />

              <Link
                to={`/product/${currentProduct.id}`}
                key={currentProduct.id}
                onClick={handleSlideClick}
                draggable={false}
                className="
                  group relative grid min-h-[185px]
                  grid-cols-[1fr_0.82fr] items-center gap-2
                  px-3 py-4
                  sm:min-h-[270px] sm:grid-cols-2 sm:gap-6
                  sm:px-10 sm:py-8
                  lg:min-h-[340px] lg:px-16 lg:py-10
                "
              >
                {/* PRODUCT DETAILS */}
                <div className="relative z-10 order-1 min-w-0 text-left">
                  <div className="mb-2 inline-flex max-w-full items-center gap-1 rounded-full border border-purple-400/20 bg-purple-500/10 px-2 py-1 text-[8px] font-bold tracking-wide text-[#C4A7FF] sm:mb-4 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[10px]">
                    <Sparkles size={11} className="shrink-0 sm:h-3 sm:w-3" />
                    FEATURED PRODUCT
                  </div>

                  {currentProduct.badge && (
                    <div className="mb-1 text-[9px] font-bold text-[#B99AFF] sm:mb-3 sm:text-xs">
                      {currentProduct.badge}
                    </div>
                  )}

                  <h1 className="line-clamp-2 break-words text-[15px] font-extrabold leading-tight text-white sm:max-w-[420px] sm:text-3xl lg:text-5xl">
                    {currentProduct.name}
                  </h1>

                  <p className="mt-1.5 line-clamp-2 text-[9px] leading-4 text-[#B9B2CE] sm:mt-3 sm:max-w-sm sm:text-sm sm:leading-6">
                    {currentProduct.description ||
                      "Discover premium digital products at AI-SaleBD."}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-5 sm:gap-3">
                    <span className="text-base font-extrabold text-white sm:text-2xl lg:text-3xl">
                      ৳
                      {Number(currentProduct.price || 0).toLocaleString(
                        "en-BD",
                      )}
                    </span>

                    {currentProduct.oldPrice &&
                      Number(currentProduct.oldPrice) >
                        Number(currentProduct.price) && (
                        <span className="text-[9px] text-[#AAA3C1] line-through sm:text-sm">
                          ৳
                          {Number(currentProduct.oldPrice).toLocaleString(
                            "en-BD",
                          )}
                        </span>
                      )}
                  </div>

                  <span className="mt-2 inline-flex min-h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#4F46E5] px-2.5 py-1.5 text-[9px] font-bold text-white shadow-lg shadow-purple-950/30 transition group-hover:brightness-110 sm:mt-5 sm:min-h-11 sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm">
                    <ShoppingBag size={12} />
                    Shop Now
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>

                {/* PRODUCT IMAGE */}
                <div className="relative order-2 flex h-[125px] min-w-0 items-center justify-center sm:h-[220px] lg:h-[270px]">
                  <div className="absolute inset-2 rounded-full bg-purple-500/20 blur-[35px] sm:inset-8 sm:blur-[65px]" />

                  <div className="relative flex h-full w-full max-w-[150px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-2 sm:max-w-none sm:rounded-2xl sm:p-5">
                    {currentProduct.image ? (
                      <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                        draggable={false}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#AAA3C1]">
                        <ImageOff size={25} />
                        <span className="text-[10px] sm:text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>

              {/* PREVIOUS / NEXT */}
              {sliderProducts.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousSlide}
                    aria-label="Previous slide"
                    className="absolute left-1.5 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#171326]/85 text-white backdrop-blur transition hover:bg-purple-600 sm:left-3 sm:h-10 sm:w-10"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-1.5 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#171326]/85 text-white backdrop-blur transition hover:bg-purple-600 sm:right-3 sm:h-10 sm:w-10"
                  >
                    <ChevronRight size={17} />
                  </button>

                  {/* DOTS */}
                  <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-4 sm:gap-2">
                    {sliderProducts.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={
                          safeActiveSlide === index ? "true" : undefined
                        }
                        className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                          safeActiveSlide === index
                            ? "w-5 bg-[#C4A7FF] sm:w-7"
                            : "w-1.5 bg-white/40 hover:bg-white/70 sm:w-2"
                        }`}
                      />
                    ))}
                  </div>

                  {/* SLIDE COUNTER */}
                  <div className="absolute right-2 top-2 z-10 rounded-full border border-white/10 bg-[#171326]/80 px-2 py-1 text-[8px] font-semibold text-white backdrop-blur sm:right-5 sm:top-5 sm:px-3 sm:text-[10px]">
                    {safeActiveSlide + 1} / {sliderProducts.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="relative flex min-h-[190px] items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#29194C] via-[#211B3B] to-[#17243E] px-4 py-5 sm:min-h-[270px] sm:rounded-3xl sm:px-10 lg:min-h-[320px] lg:px-16">
              <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-purple-500/20 blur-[80px]" />

              <div className="relative z-10 max-w-lg">
                <div className="mb-2 inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-[#C4A7FF] sm:mb-3 sm:text-xs">
                  <Sparkles size={13} />
                  WELCOME TO AI-SALEBD
                </div>

                <h1 className="text-xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Your Digital Marketplace
                </h1>

                <p className="mt-2 max-w-sm text-[10px] leading-4 text-[#B9B2CE] sm:mt-3 sm:text-sm sm:leading-6">
                  Discover AI tools, premium subscriptions and digital products.
                </p>

                <Link
                  to="/shop"
                  className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F46E5] px-3 py-2 text-[10px] font-bold text-white transition hover:brightness-110 sm:mt-5 sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  Browse Products
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="relative mr-1 hidden h-28 w-28 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-[#C4A7FF] sm:flex lg:mr-10 lg:h-40 lg:w-40">
                <Sparkles size={55} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEARCH */}
      <section className="container-custom py-3 sm:py-5">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] p-1.5 sm:rounded-2xl sm:p-2"
        >
          <Search size={18} className="ml-2 shrink-0 text-[#AAA3C1]" />
          <input
            name="search"
            type="search"
            placeholder="Search AI tools and digital products..."
            aria-label="Search products"
            className="h-10 min-w-0 flex-1 bg-transparent px-1 text-xs text-white outline-none placeholder:text-[#77718D] sm:h-11 sm:text-sm"
          />
          <button
            type="submit"
            className="min-h-10 rounded-lg bg-[#8B5CF6] px-4 text-xs font-bold text-white transition hover:bg-[#7C3AED] active:scale-95 sm:min-h-11 sm:rounded-xl sm:px-6 sm:text-sm"
          >
            Search
          </button>
        </form>
      </section>

      {/* TRUST & BENEFITS */}
      <section className="container-custom pb-5 sm:pb-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-[#211B3B]/70 p-3 transition hover:border-purple-400/30 sm:gap-3 sm:rounded-2xl sm:p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-[#B99AFF] sm:h-11 sm:w-11 sm:rounded-xl">
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-[10px] font-bold text-white sm:text-sm">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[9px] text-[#AAA3C1] sm:text-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}
      <CategorySection />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* BEST SELLERS */}
      {bestSellerProducts.length > 0 && (
        <section className="container-custom py-7 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-bold text-[#B99AFF]">
                <Star size={15} />
                POPULAR PICKS
              </div>
              <h2 className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
                Popular Products
              </h2>
              <p className="mt-1 text-xs text-[#AAA3C1] sm:text-sm">
                Explore products marked as popular.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#C4A7FF] transition hover:text-white sm:text-sm"
            >
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {bestSellerProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group overflow-hidden rounded-xl border border-white/10 bg-[#211B3B] transition duration-300 hover:-translate-y-1 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-950/20 sm:rounded-2xl"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white/[0.035] p-4 sm:p-6">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#AAA3C1]">
                      <ImageOff size={28} />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <span className="absolute left-2 top-2 rounded-md bg-purple-500/15 px-2 py-1 text-[9px] font-bold text-[#C4A7FF]">
                    POPULAR
                  </span>
                </div>

                <div className="p-3 sm:p-4">
                  <h3 className="line-clamp-2 min-h-9 text-xs font-bold text-white transition group-hover:text-[#C4A7FF] sm:min-h-10 sm:text-sm">
                    {product.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-white sm:text-base">
                      ৳{Number(product.price || 0).toLocaleString("en-BD")}
                    </span>
                    {product.oldPrice &&
                      Number(product.oldPrice) > Number(product.price) && (
                        <span className="text-[10px] text-[#AAA3C1] line-through">
                          ৳{Number(product.oldPrice).toLocaleString("en-BD")}
                        </span>
                      )}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-purple-500/10 py-2 text-[10px] font-bold text-[#C4A7FF] transition group-hover:bg-purple-500 group-hover:text-white sm:text-xs">
                    View Product <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PROMOTIONAL CTA */}
      <section className="container-custom py-5 sm:py-8">
        <div className="relative overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-r from-[#29194C] via-[#302052] to-[#17243E] px-5 py-7 sm:rounded-3xl sm:px-10 sm:py-10 lg:px-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-purple-500/20 blur-[80px]" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#C4A7FF]">
                <Sparkles size={15} />
                EXPLORE MORE
              </div>
              <h2 className="text-xl font-extrabold leading-tight text-white sm:text-3xl">
                Find the Right Digital Tools for You
              </h2>
              <p className="mt-2 text-xs leading-5 text-[#C7BEDB] sm:text-sm sm:leading-6">
                Explore our collection and discover digital products that match
                your needs.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#4F46E5] px-5 py-3 text-xs font-bold text-white shadow-lg shadow-purple-950/30 transition hover:brightness-110 active:scale-95 sm:text-sm"
            >
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AI-SALEBD */}
      <section className="container-custom py-7 sm:py-10">
        <div className="mx-auto mb-6 max-w-xl text-center sm:mb-8">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-[#B99AFF]">
            <Sparkles size={15} />
            WHY AI-SALEBD
          </div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            A Simpler Way to Explore Digital Products
          </h2>
          <p className="mt-2 text-xs leading-5 text-[#AAA3C1] sm:text-sm">
            Discover products, get assistance and place your orders with ease.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-[#211B3B]/70 p-5 transition hover:-translate-y-1 hover:border-purple-400/30 sm:p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-[#B99AFF]">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-bold text-white sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#AAA3C1] sm:text-sm sm:leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER SUPPORT CTA */}
      <section className="container-custom py-5 sm:py-7">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#211B3B]/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <MessageCircle size={22} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white sm:text-base">
                Need Help Choosing a Product?
              </h2>
              <p className="mt-1 text-[11px] text-[#AAA3C1] sm:text-xs">
                Contact our team for product and ordering assistance.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-green-600 active:scale-95 sm:text-sm"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-custom py-8 sm:py-12">
        <div className="mx-auto mb-6 max-w-xl text-center sm:mb-8">
          <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold text-[#B99AFF]">
            <HelpCircle size={15} />
            NEED TO KNOW
          </div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-xs text-[#AAA3C1] sm:text-sm">
            Find answers to common questions about AI-SaleBD.
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#211B3B]/70"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className="text-xs font-semibold text-white sm:text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#B99AFF] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/[0.07] px-4 py-4 text-xs leading-6 text-[#AAA3C1] sm:px-5 sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
