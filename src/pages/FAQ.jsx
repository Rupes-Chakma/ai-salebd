import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Truck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const faqCategories = [
  {
    title: "General Questions",
    icon: HelpCircle,
    questions: [
      {
        question: "What is AI-SaleBD?",
        answer:
          "AI-SaleBD is a digital marketplace where you can explore different digital products, including AI Tools, Gaming products, Subscriptions, Gift Cards, and Software.",
      },
      {
        question: "How can I browse products?",
        answer:
          "Visit our Shop page to explore available products. You can also browse products by category or use the search feature to find what you need.",
      },
      {
        question: "Do I need an account to place an order?",
        answer:
          "Account requirements may depend on the available ordering process. Follow the instructions shown during checkout or contact our support team for assistance.",
      },
    ],
  },
  {
    title: "Orders & Delivery",
    icon: Truck,
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Choose your preferred product, add it to your cart, and proceed to checkout. Provide the required customer information and submit your order.",
      },
      {
        question: "How will I receive my digital product?",
        answer:
          "Delivery instructions depend on the product. Please confirm the delivery method and expected delivery time with our support team before completing your purchase.",
      },
      {
        question: "How can I check my order status?",
        answer:
          "You can check the order information available in the My Orders section. For additional assistance, contact our support team with your order details.",
      },
      {
        question: "What should I do if my order is delayed?",
        answer:
          "Please contact our support team through WhatsApp and provide your order ID so we can assist you.",
      },
    ],
  },
  {
    title: "Payments",
    icon: CreditCardIcon,
    questions: [
      {
        question: "Which payment methods are available?",
        answer:
          "Available payment options are shown during checkout. Please confirm the accepted payment method and payment instructions before making a payment.",
      },
      {
        question: "Is online payment automatically processed?",
        answer:
          "Payment processing depends on the available payment system. AI-SaleBD currently does not claim automatic payment gateway processing.",
      },
      {
        question:
          "What should I do if my payment is completed but my order is not updated?",
        answer:
          "Contact our support team with your order ID and relevant payment information. Never share your PIN, password, or OTP.",
      },
    ],
  },
  {
    title: "Products & Security",
    icon: ShieldCheck,
    questions: [
      {
        question: "Are all products available all the time?",
        answer:
          "Product availability can change. Please check the product page or contact support to confirm availability before ordering.",
      },
      {
        question: "Can I request product information before buying?",
        answer:
          "Yes. You can contact us through WhatsApp or our Contact page if you need more information about a product.",
      },
      {
        question: "What if I receive an incorrect product?",
        answer:
          "Please contact support as soon as possible with your order ID and a description of the issue. Our team can review your request according to the applicable policies.",
      },
    ],
  },
];

function CreditCardIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(0);

  const currentCategory = faqCategories[activeCategory];

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    setOpenQuestion(0);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F0C] text-[#F5F7F5]">
      {/* HERO */}
      <section className="relative px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/[0.08] blur-[110px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 text-green-400 sm:h-16 sm:w-16">
            <HelpCircle size={30} />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-green-400 sm:text-sm">
            Help Center
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Frequently Asked
            <span className="block text-green-400">Questions</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#A3ADA4] sm:text-base sm:leading-8">
            Find answers to common questions about AI-SaleBD, products, orders,
            payments, and digital delivery.
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-7 lg:grid-cols-12 lg:gap-8">
            {/* CATEGORY SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#141A15] p-4">
                <h2 className="mb-4 px-3 text-xs font-bold tracking-wider text-[#A3ADA4]">
                  BROWSE BY CATEGORY
                </h2>

                <div className="space-y-2">
                  {faqCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === index;

                    return (
                      <button
                        key={category.title}
                        type="button"
                        onClick={() => handleCategoryChange(index)}
                        aria-pressed={isActive}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition duration-200 ${
                          isActive
                            ? "border border-green-500/20 bg-green-500/10 text-white"
                            : "border border-transparent text-[#A3ADA4] hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <Icon
                            size={19}
                            className={`shrink-0 ${
                              isActive ? "text-green-400" : "text-[#7D887E]"
                            }`}
                          />
                          <span>{category.title}</span>
                        </span>

                        <span
                          className={`rounded-md px-2 py-1 text-xs ${
                            isActive
                              ? "bg-green-500/15 text-green-400"
                              : "bg-white/[0.05] text-[#879188]"
                          }`}
                        >
                          {category.questions.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SUPPORT CARD */}
              <div className="mt-5 rounded-2xl border border-rose-500/15 bg-[#141A15] p-5 sm:p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                  <MessageCircle size={23} />
                </div>

                <h3 className="mt-5 text-lg font-bold">Still need help?</h3>

                <p className="mt-2 text-sm leading-7 text-[#A3ADA4]">
                  Can't find the answer you're looking for? Contact our support
                  team.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green-400 transition hover:text-green-300"
                >
                  Contact Support
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>

            {/* QUESTIONS */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-green-400">
                  FAQ Category
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {currentCategory.title}
                </h2>

                <p className="mt-2 text-sm text-[#A3ADA4]">
                  {currentCategory.questions.length} questions and answers
                </p>
              </div>

              <div className="space-y-3">
                {currentCategory.questions.map((item, index) => {
                  const isOpen = openQuestion === index;
                  const answerId = `faq-answer-${activeCategory}-${index}`;

                  return (
                    <div
                      key={item.question}
                      className={`overflow-hidden rounded-2xl border transition duration-200 ${
                        isOpen
                          ? "border-green-500/30 bg-[#141A15]"
                          : "border-white/[0.08] bg-[#111711] hover:border-white/15"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
                      >
                        <span className="text-sm font-semibold leading-6 text-[#F5F7F5] sm:text-base">
                          {item.question}
                        </span>

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition duration-200 ${
                            isOpen
                              ? "rotate-180 bg-green-500/10 text-green-400"
                              : "bg-white/[0.05] text-[#A3ADA4]"
                          }`}
                        >
                          <ChevronDown size={19} />
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          id={answerId}
                          className="px-4 pb-5 sm:px-5 sm:pb-6"
                        >
                          <div className="mb-4 h-px bg-white/[0.08]" />
                          <p className="text-sm leading-7 text-[#A3ADA4]">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-green-500/15 bg-[#141A15] px-6 py-10 text-center sm:rounded-3xl sm:px-12 sm:py-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-400">
            <MessageCircle size={26} />
          </div>

          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Have More Questions?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A3ADA4]">
            Our support team is here to help you with your questions and product
            inquiries.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-green-500"
          >
            Contact Us
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
