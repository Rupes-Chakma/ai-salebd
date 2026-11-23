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
    <main className="min-h-screen bg-[#0B0F0C] text-[#F5F7F5]">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.08] bg-[#0E140F] px-4 py-16 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-green-500/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-rose-500/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/20 bg-green-500/10 shadow-lg shadow-green-950/20"
          >
            <RefreshCw size={32} className="text-green-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Refund <span className="text-green-400">Policy</span>
          </motion.h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-[#A3ADA4] sm:text-base">
            Your satisfaction matters to us. Please review our refund guidelines
            before placing an order on AI-SaleBD.
          </p>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#A3ADA4] sm:text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Last Updated: November 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        {/* Refund Commitment */}
        <div className="mb-8 rounded-2xl border border-green-500/15 bg-[#111711] p-5 sm:p-7">
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <ShieldCheck className="text-green-400" size={23} />
            </div>

            <h2 className="text-lg font-semibold sm:text-xl">
              Our Refund Commitment
            </h2>
          </div>

          <p className="text-sm leading-7 text-[#A3ADA4]">
            AI-SaleBD aims to provide a reliable digital shopping experience.
            Refund requests are reviewed individually based on the product,
            order details, delivery status, and the reason for the request.
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Refund Conditions */}
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isPositive = index === 0;

            return (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group rounded-2xl border border-white/[0.07] bg-[#111711] p-5 transition-colors duration-300 hover:border-green-500/20 hover:bg-[#141A15] sm:p-7"
              >
                <div className="mb-5 flex items-start gap-3 sm:gap-4">
                  <div
                    className={`shrink-0 rounded-xl border p-3 ${
                      isPositive
                        ? "border-green-500/10 bg-green-500/[0.08]"
                        : "border-rose-500/10 bg-rose-500/[0.08]"
                    }`}
                  >
                    <Icon
                      size={22}
                      className={
                        isPositive ? "text-green-400" : "text-rose-400"
                      }
                    />
                  </div>

                  <h2 className="pt-2 text-base font-semibold leading-6 sm:text-xl">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3 sm:pl-[60px]">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-7 text-[#A3ADA4]"
                    >
                      <span
                        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                          isPositive ? "bg-green-400" : "bg-rose-400"
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}

          {/* Refund Process */}
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/[0.07] bg-[#111711] p-5 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border border-green-500/10 bg-green-500/[0.08] p-3">
                <RefreshCw className="text-green-400" size={22} />
              </div>

              <h2 className="text-lg font-semibold sm:text-xl">
                Refund Process
              </h2>
            </div>

            <ol className="space-y-4 sm:pl-[60px]">
              {[
                "Contact our support team with your order information.",
                "Explain the issue and provide relevant screenshots or evidence.",
                "Our team will review your request and may ask for additional information.",
                "We will inform you of the decision and any applicable next steps.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-7 text-[#A3ADA4]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-green-500/15 bg-green-500/10 text-xs font-semibold text-green-400">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-5 border-t border-white/[0.07] pt-5 text-sm leading-7 text-[#A3ADA4] sm:ml-[60px]">
              Approved refunds will be processed through an appropriate payment
              method, subject to payment provider procedures and applicable
              processing times.
            </p>
          </motion.article>

          {/* Important Notice */}
          <div className="rounded-2xl border border-rose-500/15 bg-[#141311] p-5 sm:p-7">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-xl bg-rose-500/10 p-2.5">
                <AlertCircle className="text-rose-400" size={22} />
              </div>

              <h2 className="text-lg font-semibold">Important Notice</h2>
            </div>

            <p className="text-sm leading-7 text-[#A3ADA4]">
              Digital products, subscriptions, gift cards, and software licenses
              may be non-refundable after successful delivery, activation, or
              redemption. However, eligible issues will be reviewed by our
              support team. Please check product details carefully before
              purchasing.
            </p>
          </div>
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-8 rounded-2xl border border-green-500/15 bg-[#111711] p-6 text-center sm:mt-10 sm:p-9"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-green-500/15 bg-green-500/10">
            <MessageCircle size={27} className="text-green-400" />
          </div>

          <h2 className="mb-3 text-xl font-bold sm:text-2xl">
            Need Help With a Refund?
          </h2>

          <p className="mx-auto mb-6 max-w-xl text-sm leading-7 text-[#A3ADA4]">
            Contact our support team if you have any questions about your order
            or refund request.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-950/20 transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#111711]"
          >
            Contact Support
            <MessageCircle size={17} />
          </Link>
        </motion.div>

        {/* Terms Link */}
        <div className="mt-7 text-center">
          <Link
            to="/terms"
            className="inline-flex items-center gap-2 text-sm text-[#A3ADA4] transition-colors hover:text-green-400"
          >
            Read our Terms & Conditions
            <span className="text-rose-400">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default RefundPolicy;
