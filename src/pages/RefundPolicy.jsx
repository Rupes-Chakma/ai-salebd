import { motion } from "framer-motion";
import {
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  const sections = [
    {
      icon: CheckCircle2,
      title: "When You Can Request a Refund",
      items: [
        "You received a product different from the one you ordered.",
        "The purchased product or service is defective or not working as described.",
        "Your order could not be fulfilled due to product unavailability.",
        "You were charged incorrectly for an order.",
      ],
    },
    {
      icon: XCircle,
      title: "When Refunds May Not Be Available",
      items: [
        "The digital product has already been successfully delivered or activated.",
        "You selected the wrong product or subscription by mistake.",
        "You changed your mind after successful delivery.",
        "The issue occurred due to incorrect account details provided by the customer.",
        "The product was misused or its terms of service were violated.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#11101C] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#211344] via-[#17132b] to-[#11101C] px-4 py-20">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-600/20 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/30 bg-purple-500/15"
          >
            <RefreshCw size={32} className="text-purple-400" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Refund <span className="text-purple-400">Policy</span>
          </h1>

          <p className="mx-auto max-w-2xl text-gray-300">
            Your satisfaction matters to us. Please review our refund guidelines
            before placing an order on AI-SaleBD.
          </p>

          <p className="mt-5 text-sm text-gray-500">
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="mb-10 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
          <div className="mb-3 flex items-center gap-3">
            <ShieldCheck className="text-purple-400" size={24} />
            <h2 className="text-xl font-semibold">Our Refund Commitment</h2>
          </div>
          <p className="leading-7 text-gray-300">
            AI-SaleBD aims to provide a reliable digital shopping experience.
            Refund requests are reviewed individually based on the product,
            order details, delivery status, and the reason for the request.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#191827] p-6 md:p-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-purple-500/10 p-3">
                    <Icon className="text-purple-400" size={23} />
                  </div>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>

                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-gray-300"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          <div className="rounded-2xl border border-white/10 bg-[#191827] p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <RefreshCw className="text-purple-400" size={23} />
              <h2 className="text-xl font-semibold">Refund Process</h2>
            </div>

            <ol className="list-inside list-decimal space-y-3 text-sm leading-7 text-gray-300">
              <li>Contact our support team with your order information.</li>
              <li>
                Explain the issue and provide relevant screenshots or evidence.
              </li>
              <li>
                Our team will review your request and may ask for additional
                information.
              </li>
              <li>
                We will inform you of the decision and any applicable next
                steps.
              </li>
            </ol>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Approved refunds will be processed through an appropriate payment
              method, subject to payment provider procedures and applicable
              processing times.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">
            <div className="mb-3 flex items-center gap-3">
              <AlertCircle className="text-yellow-400" size={23} />
              <h2 className="text-lg font-semibold">Important Notice</h2>
            </div>
            <p className="text-sm leading-7 text-gray-300">
              Digital products, subscriptions, gift cards, and software licenses
              may be non-refundable after successful delivery, activation, or
              redemption. However, eligible issues will be reviewed by our
              support team. Please check product details carefully before
              purchasing.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-600/15 to-blue-600/10 p-8 text-center">
          <MessageCircle className="mx-auto mb-4 text-purple-400" size={32} />
          <h2 className="mb-3 text-2xl font-bold">Need Help With a Refund?</h2>
          <p className="mb-6 text-gray-300">
            Contact our support team if you have any questions about your order
            or refund request.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-700"
          >
            Contact Support
            <MessageCircle size={18} />
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <Link to="/terms" className="transition hover:text-purple-400">
            Read our Terms & Conditions
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
