import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Mail,
  Headphones,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const WHATSAPP_NUMBER = "8801648582639";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const whatsappMessage = `
Hello AI-SaleBD!

Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${subject.trim()}

Message:
${message.trim()}
    `.trim();

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    const newWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

    if (!newWindow) {
      toast.error("Please allow pop-ups to open WhatsApp.");
      return;
    }

    toast.success("WhatsApp message is ready. Please press Send there.");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Contact us directly through WhatsApp.",
      action: "Chat on WhatsApp",
      link: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Prepare your message through our contact form.",
      action: "Use Contact Form",
      link: "#contact-form",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
    },
    {
      icon: Headphones,
      title: "Customer Assistance",
      description: "Need help with an order or product? Contact our support.",
      action: "Get Support",
      link: `https://wa.me/${WHATSAPP_NUMBER}`,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F0C] text-[#F5F7F5]">
      {/* HERO */}
      <section className="relative px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-green-500/[0.08] blur-[110px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            <MessageCircle size={16} />
            We're Here to Help
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Get in <span className="text-green-400">Touch</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#A3ADA4] sm:text-base sm:leading-8">
            Have a question about a product, order, or service? We'd love to
            hear from you. Contact our support team and we'll do our best to
            assist you.
          </p>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {contactOptions.map((item) => {
            const Icon = item.icon;
            const isExternal = item.link.startsWith("https://");

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-[#141A15] p-5 transition duration-300 hover:-translate-y-1 hover:border-green-500/30 hover:bg-[#1A231B] sm:p-6"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
                >
                  <Icon size={24} />
                </div>

                <h2 className="mt-5 text-lg font-bold">{item.title}</h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-[#A3ADA4]">
                  {item.description}
                </p>

                <a
                  href={item.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
                >
                  {item.action}
                  <ArrowRight size={16} />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact-form"
        className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-5 lg:gap-12">
          {/* LEFT INFORMATION */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              Contact Us
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Let's start a
              <span className="block text-green-400">Conversation.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#A3ADA4]">
              Whether you need product information, order assistance, or general
              support, send us a message through the form.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                  <Clock size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Support Availability</h3>
                  <p className="mt-1 text-sm leading-6 text-[#A3ADA4]">
                    Contact us through WhatsApp for support and inquiries.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h3 className="font-semibold">Customer Assistance</h3>
                  <p className="mt-1 text-sm leading-6 text-[#A3ADA4]">
                    Please include your order details when requesting
                    order-related assistance.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" size={21} />
                  <h3 className="font-semibold">Quick Support</h3>
                </div>

                <p className="mt-3 text-sm leading-7 text-[#A3ADA4]">
                  For a quicker conversation, you can contact us directly
                  through WhatsApp.
                </p>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-500"
                >
                  <MessageCircle size={18} />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.08] bg-[#141A15] p-5 shadow-xl sm:rounded-3xl sm:p-8"
            >
              <h3 className="text-2xl font-bold">Send Us a Message</h3>

              <p className="mt-2 text-sm leading-6 text-[#A3ADA4]">
                Fill out the form below to prepare your WhatsApp message.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-[#D5DDD5]"
                  >
                    Your Name *
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0B0F0C] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#687269] focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-[#D5DDD5]"
                  >
                    Email Address *
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={150}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0B0F0C] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#687269] focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-[#D5DDD5]"
                >
                  Subject *
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is your inquiry about?"
                  maxLength={150}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0B0F0C] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#687269] focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-[#D5DDD5]"
                >
                  Your Message *
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={6}
                  maxLength={3000}
                  required
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#0B0F0C] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#687269] focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                />
              </div>

              <button
                type="submit"
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-500 active:scale-[0.99]"
              >
                Prepare WhatsApp Message
                <Send size={17} />
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-[#879188]">
                Your message will open in WhatsApp. You must press Send in
                WhatsApp to submit it.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-2xl border border-green-500/15 bg-[#141A15] px-6 py-10 text-center sm:rounded-3xl sm:px-12 sm:py-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Explore the AI-SaleBD Marketplace
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A3ADA4]">
            Discover digital products, explore categories, and find what you
            need in one place.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-green-500"
          >
            Explore Products
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Contact;
