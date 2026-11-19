import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  ShoppingBag,
  CreditCard,
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
    icon: CreditCard,
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

function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(0);

  const currentCategory = faqCategories[activeCategory];

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    setOpenQuestion(0);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#080711] text-white">
      {/* HERO */}
      <section className="relative px-4 pb-16 pt-20 sm:px-6 sm:pt-24 lg:px-8">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400">
            <HelpCircle size={32} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-purple-400">
            Help Center
          </p>

          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Frequently Asked
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-gray-400 sm:text-base">
            Find answers to common questions about AI-SaleBD, products, orders,
            payments, and digital delivery.
          </p>
        </div>
      </section>

      {/* FAQ CONTENT */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* CATEGORY SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-[#171426] p-4">
                <h2 className="mb-4 px-3 text-sm font-bold text-gray-400">
                  BROWSE BY CATEGORY
                </h2>

                <div className="space-y-2">
                  {faqCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === index;

                    return (
                      <button
                        key={category.title}
                        onClick={() => handleCategoryChange(index)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-4 text-left text-sm font-semibold transition ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white ring-1 ring-purple-500/30"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon
                            size={19}
                            className={
                              isActive ? "text-purple-400" : "text-gray-500"
                            }
                          />
                          {category.title}
                        </span>

                        <span className="text-xs text-gray-500">
                          {category.questions.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-600/15 to-blue-600/10 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                  <MessageCircle size={24} />
                </div>

                <h3 className="mt-5 text-lg font-bold">Still need help?</h3>

                <p className="mt-2 text-sm leading-7 text-gray-400">
                  Can't find the answer you're looking for? Contact our support
                  team.
                </p>

                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-300 transition hover:text-white"
                >
                  Contact Support
                  <ArrowRight size={16} />
                </Link>
              </div>
            </aside>

            {/* QUESTIONS */}
            <div className="lg:col-span-8">
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400">
                  FAQ Category
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {currentCategory.title}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  {currentCategory.questions.length} questions and answers
                </p>
              </div>

              <div className="space-y-3">
                {currentCategory.questions.map((item, index) => {
                  const isOpen = openQuestion === index;

                  return (
                    <div
                      key={item.question}
                      className={`overflow-hidden rounded-2xl border transition ${
                        isOpen
                          ? "border-purple-500/40 bg-[#171426]"
                          : "border-white/10 bg-[#11101C] hover:border-white/20"
                      }`}
                    >
                      <button
                        onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                      >
                        <span className="text-sm font-semibold leading-6 text-white sm:text-base">
                          {item.question}
                        </span>

                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                            isOpen
                              ? "rotate-180 bg-purple-500/20 text-purple-300"
                              : "bg-white/5 text-gray-400"
                          }`}
                        >
                          <ChevronDown size={19} />
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6">
                          <div className="mb-4 h-px bg-white/10" />
                          <p className="text-sm leading-8 text-gray-400">
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
      <section className="px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-r from-purple-600/15 to-blue-600/15 px-6 py-12 text-center sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
            <MessageCircle size={27} />
          </div>

          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Have More Questions?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400">
            Our support team is here to help you with your questions and product
            inquiries.
          </p>

          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:scale-105"
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
