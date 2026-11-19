import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Gamepad2,
  Sparkles,
  Crown,
  Gift,
  Monitor,
  ShieldCheck,
  Zap,
  Headphones,
  ShoppingBag,
  Package,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  Bot,
  CreditCard,
} from "lucide-react";
import { useState } from "react";

import FeaturedProducts from "../components/home/FeaturedProducts";
import CategorySection from "../components/home/CategorySection";

const categories = [
  {
    name: "AI Tools",
    icon: Sparkles,
    path: "/category/ai-tools",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    name: "Subscriptions",
    icon: Crown,
    path: "/category/subscriptions",
    color: "from-pink-500/20 to-purple-500/10",
  },
  {
    name: "Software",
    icon: Monitor,
    path: "/category/software",
    color: "from-cyan-500/20 to-blue-500/10",
  },
  {
    name: "Gift Cards",
    icon: Gift,
    path: "/category/gift-cards",
    color: "from-orange-500/20 to-yellow-500/10",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    path: "/category/gaming",
    color: "from-purple-500/20 to-indigo-500/10",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Trusted Service",
    description: "Clear product information and transparent order assistance.",
  },
  {
    icon: Zap,
    title: "Quick Order Processing",
    description: "Get timely updates while our team processes your order.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Contact our support team whenever you need assistance.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore AI Tools",
    description:
      "Browse AI tools, subscriptions and other digital products to find what you need.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Order via WhatsApp",
    description:
      "Select your product and send your order through WhatsApp for confirmation.",
  },
  {
    number: "03",
    icon: Package,
    title: "Confirmation & Delivery",
    description:
      "Our team will confirm your order and communicate the relevant delivery details.",
  },
];

const faqs = [
  {
    question: "What is AI-SaleBD?",
    answer:
      "AI-SaleBD is a Bangladesh-focused digital marketplace where you can explore AI tools, premium subscriptions, software, gift cards and other digital products.",
  },
  {
    question: "What products can I buy?",
    answer:
      "You can explore AI tools, subscriptions, software, gift cards and gaming-related digital products available in our marketplace.",
  },
  {
    question: "How can I place an order?",
    answer:
      "Browse the Shop, select a product and use the WhatsApp order option. You can also add multiple products to your cart and send your order through WhatsApp.",
  },
  {
    question: "How will I receive my product?",
    answer:
      "After your order is confirmed, our team will communicate the applicable delivery method and relevant instructions.",
  },
  {
    question: "Which payment methods are available?",
    answer:
      "Payment instructions and available payment methods will be communicated by our support team during order confirmation.",
  },
  {
    question: "Can I request a refund?",
    answer:
      "Refund requests are reviewed according to our Refund Policy. Please contact our support team for assistance.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = e.currentTarget.search.value.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="overflow-x-clip">
      {/* HERO SECTION */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/15 via-transparent to-[#38BDF8]/10" />

        <div className="container-custom relative grid items-center gap-9 py-10 sm:py-14 lg:min-h-[570px] lg:grid-cols-2 lg:gap-12 lg:py-20">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3 py-2 text-[11px] font-semibold text-[#B99AFF] sm:text-sm">
              <Sparkles size={15} />
              Bangladesh's AI Tools Marketplace
            </span>

            <h1 className="mt-5 text-[34px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl lg:mt-7 lg:text-6xl">
              Discover Powerful
              <br />
              <span className="gradient-text">AI Tools.</span>
              <br />
              One Marketplace.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#AAA3C1] sm:text-base lg:mx-0 lg:mt-6">
              Explore AI tools, premium subscriptions, software and digital
              services — everything you need in one marketplace.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                to="/category/ai-tools"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-purple-950/30 transition hover:brightness-110 active:scale-[0.98]"
              >
                <Sparkles size={18} />
                Explore AI Tools
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/shop"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
              >
                <ShoppingBag size={18} />
                Browse All Products
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs text-[#AAA3C1] lg:justify-start sm:text-sm">
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#38BDF8]" />
                Trusted Service
              </span>

              <span className="flex items-center gap-2">
                <Zap size={16} className="text-[#38BDF8]" />
                Quick Order Processing
              </span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
            <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/20 blur-[90px]" />

            <div className="relative rounded-3xl border border-white/10 bg-[#211B3B]/90 p-4 shadow-2xl shadow-purple-950/40 backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-[#AAA3C1] sm:text-sm">
                    Welcome to
                  </p>

                  <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    <span className="gradient-text">AI-SaleBD</span>
                  </h2>

                  <p className="mt-1 text-xs text-[#AAA3C1]">
                    Your Gateway to Premium AI Tools.
                  </p>
                </div>

                <div className="rounded-xl bg-[#8B5CF6]/20 p-3 sm:p-4">
                  <Bot size={27} className="text-[#B99AFF]" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-7 sm:gap-4">
                {categories.slice(0, 4).map((category) => {
                  const Icon = category.icon;

                  return (
                    <Link
                      key={category.name}
                      to={category.path}
                      className={`rounded-2xl border border-white/10 bg-gradient-to-br ${category.color} p-4 transition hover:-translate-y-1 hover:border-[#8B5CF6]/50 sm:p-5`}
                    >
                      <Icon size={25} className="text-[#B99AFF]" />

                      <p className="mt-3 text-xs font-bold text-white sm:mt-4 sm:text-sm">
                        {category.name}
                      </p>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-white/5 bg-white/5 p-3 sm:p-4">
                <p className="text-xs font-semibold text-white sm:text-sm">
                  Discover. Choose. Order.
                </p>

                <p className="mt-1 text-[11px] text-[#AAA3C1] sm:text-xs">
                  Your digital essentials, all in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="container-custom py-5 sm:py-8">
        <form
          onSubmit={handleSearch}
          className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-[#211B3B] p-2"
        >
          <Search size={19} className="ml-2 shrink-0 text-[#AAA3C1]" />

          <input
            name="search"
            type="search"
            placeholder="Search AI tools and digital products..."
            aria-label="Search products"
            className="h-11 min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-[#77718D]"
          />

          <button
            type="submit"
            className="min-h-11 rounded-xl bg-[#8B5CF6] px-4 text-sm font-bold text-white transition hover:bg-[#7C3AED] active:scale-95 sm:px-6"
          >
            Search
          </button>
        </form>
      </section>

      {/* CATEGORIES */}
      <CategorySection />

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />

      {/* WHY CHOOSE US */}
      <section className="border-y border-white/5 bg-[#171426] py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-7 text-center sm:mb-10">
            <p className="text-xs font-bold tracking-widest text-[#B99AFF]">
              WHY AI-SALEBD
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Why Choose Us?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#AAA3C1]">
              Find your digital essentials with a simple ordering experience and
              dedicated customer support.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-[#211B3B] p-5 sm:block sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white sm:mt-5 sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs leading-6 text-[#AAA3C1] sm:mt-2 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-custom py-14 sm:py-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold tracking-widest text-[#B99AFF]">
            SIMPLE PROCESS
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            How It Works
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#AAA3C1]">
            Getting your digital products from AI-SaleBD is simple. Follow these
            three steps to get started.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-white/10 bg-[#211B3B] p-6 transition hover:-translate-y-1 hover:border-[#8B5CF6]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/15 text-[#B99AFF]">
                    <Icon size={24} />
                  </div>

                  <span className="text-3xl font-black text-white/10">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-[#AAA3C1]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="border-y border-white/5 bg-[#171426] py-14 sm:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="text-xs font-bold tracking-widest text-[#B99AFF]">
              NEED HELP?
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AAA3C1]">
              Find answers to common questions about shopping with AI-SaleBD.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-white/10 bg-[#211B3B]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-white sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={19}
                      className={`shrink-0 text-[#B99AFF] transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/5 px-5 py-4">
                      <p className="text-sm leading-7 text-[#AAA3C1]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B99AFF] transition hover:text-white"
            >
              View All FAQs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-custom py-14 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#29194C] via-[#211B3B] to-[#17243E] px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-[#B99AFF]">
              <Sparkles size={27} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-4xl">
              Ready to Explore AI Tools?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#C0B9D2]">
              Discover powerful AI tools, premium subscriptions and digital
              products to make your everyday work easier.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/category/ai-tools"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-purple-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
              >
                Explore AI Tools
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <MessageCircle size={17} />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
