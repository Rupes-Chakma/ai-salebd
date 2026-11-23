import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  Copy,
  CalendarDays,
  Phone,
  UserRound,
  CreditCard,
  ArrowRight,
  ClipboardList,
  Clock,
  ShieldCheck,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

function OrderSuccess() {
  const location = useLocation();
  const { isDark } = useTheme();

  let savedOrders = [];

  try {
    const parsed = JSON.parse(localStorage.getItem("nexora-orders") || "[]");
    savedOrders = Array.isArray(parsed) ? parsed : [];
  } catch {
    savedOrders = [];
  }

  const order = location.state?.order || savedOrders[0] || null;

  const cardClass = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white shadow-sm";

  const textClass = isDark ? "text-white" : "text-gray-900";
  const mutedClass = isDark ? "text-[#A3ADA4]" : "text-gray-500";

  const copyOrderId = async () => {
    if (!order?.orderId) {
      toast.error("Order ID is not available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(order.orderId);
      toast.success("Order ID copied!");
    } catch {
      toast.error("Could not copy Order ID.");
    }
  };

  if (!order) {
    return (
      <section className="container-custom flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10`}
        >
          <Package size={40} className="text-green-500" />
        </div>

        <h1 className={`mt-5 text-2xl font-extrabold ${textClass}`}>
          No Order Found
        </h1>

        <p className={`mt-2 max-w-sm text-sm leading-6 ${mutedClass}`}>
          We couldn't find an order. Please explore our products and place an
          order first.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-700"
        >
          <ShoppingBag size={17} />
          Explore Products
        </Link>
      </section>
    );
  }

  const orderDate = order.createdAt ? new Date(order.createdAt) : null;

  const formattedDate =
    orderDate && !Number.isNaN(orderDate.getTime())
      ? orderDate.toLocaleString("en-BD", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : "Date unavailable";

  const items = Array.isArray(order.items) ? order.items : [];

  return (
    <section className="container-custom max-w-4xl py-8 pb-28 sm:py-12">
      {/* Success Header */}
      <div className="mb-8 text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
          <CheckCircle2 size={54} className="text-green-500" />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-green-500">
          AI-SaleBD Order Confirmation
        </p>

        <h1 className={`mt-3 text-2xl font-extrabold sm:text-3xl ${textClass}`}>
          Order Submitted Successfully!
        </h1>

        <p className={`mx-auto mt-3 max-w-lg text-sm leading-6 ${mutedClass}`}>
          Thank you for choosing AI-SaleBD. Your order has been submitted and is
          waiting for verification.
        </p>
      </div>

      {/* Order ID Card */}
      <div className={`mb-6 rounded-2xl border p-5 sm:p-6 ${cardClass}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <p className={`text-xs ${mutedClass}`}>Your Order ID</p>

            <p className="mt-2 break-all text-xl font-extrabold text-green-500 sm:text-2xl">
              {order.orderId || "N/A"}
            </p>
          </div>

          <button
            type="button"
            onClick={copyOrderId}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition hover:border-green-500 hover:text-green-500 ${
              isDark
                ? "border-white/10 bg-black/20 text-white"
                : "border-gray-200 bg-gray-50 text-gray-700"
            }`}
          >
            <Copy size={15} />
            Copy ID
          </button>
        </div>

        <div
          className={`mt-5 flex flex-wrap items-center gap-2 border-t pt-4 text-xs ${mutedClass} ${
            isDark ? "border-white/10" : "border-gray-100"
          }`}
        >
          <CalendarDays size={15} className="text-green-500" />
          Order Date: {formattedDate}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
            <Clock size={21} className="text-amber-500" />
          </div>

          <div>
            <p className="font-bold text-amber-500">
              {order.status || "Pending Verification"}
            </p>

            <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
              Your order and payment details need to be reviewed. Order
              submission does not mean payment has been verified or the product
              has been delivered.
            </p>
          </div>
        </div>
      </div>

      {/* Main Details */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Customer Information */}
        <div className={`rounded-2xl border p-5 ${cardClass}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <UserRound size={19} />
            </div>

            <h2 className={`font-bold ${textClass}`}>Customer Information</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <UserRound size={16} className={`mt-0.5 ${mutedClass}`} />
              <div>
                <p className={`text-[11px] ${mutedClass}`}>Full Name</p>
                <p className={`mt-1 text-sm font-semibold ${textClass}`}>
                  {order.customerName || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={16} className={`mt-0.5 ${mutedClass}`} />
              <div>
                <p className={`text-[11px] ${mutedClass}`}>Mobile Number</p>
                <p className={`mt-1 text-sm font-semibold ${textClass}`}>
                  {order.phone || "N/A"}
                </p>
              </div>
            </div>

            {order.email && (
              <div className="flex items-start gap-3">
                <Mail size={16} className={`mt-0.5 ${mutedClass}`} />
                <div>
                  <p className={`text-[11px] ${mutedClass}`}>Email Address</p>
                  <p
                    className={`mt-1 break-all text-sm font-semibold ${textClass}`}
                  >
                    {order.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className={`rounded-2xl border p-5 ${cardClass}`}>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
              <CreditCard size={19} />
            </div>

            <h2 className={`font-bold ${textClass}`}>Payment Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <p className={`text-[11px] ${mutedClass}`}>Payment Method</p>
              <p className={`mt-1 text-sm font-semibold ${textClass}`}>
                {order.paymentMethod || "N/A"}
              </p>
            </div>

            <div>
              <p className={`text-[11px] ${mutedClass}`}>Sender Number</p>
              <p className={`mt-1 text-sm font-semibold ${textClass}`}>
                {order.senderNumber || "N/A"}
              </p>
            </div>

            <div>
              <p className={`text-[11px] ${mutedClass}`}>Transaction ID</p>
              <p
                className={`mt-1 break-all text-sm font-semibold ${textClass}`}
              >
                {order.transactionId || "N/A"}
              </p>
            </div>

            <div>
              <p className={`text-[11px] ${mutedClass}`}>Payment Status</p>
              <p className="mt-1 text-sm font-semibold text-amber-500">
                {order.paymentStatus || "Pending"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Products */}
      <div className={`mt-5 rounded-2xl border p-5 sm:p-6 ${cardClass}`}>
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <ClipboardList size={19} />
          </div>

          <div>
            <h2 className={`font-bold ${textClass}`}>Ordered Products</h2>
            <p className={`text-xs ${mutedClass}`}>
              {items.length} product/variant
              {items.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.cartId || `${item.productId || item.name}-${index}`}
              className={`flex gap-3 border-b pb-4 last:border-0 last:pb-0 ${
                isDark ? "border-white/10" : "border-gray-100"
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name || "Product"}
                  loading="lazy"
                  className="h-16 w-16 shrink-0 rounded-xl border border-gray-500/10 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-500/10">
                  <Package size={24} className="text-green-500" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className={`text-sm font-bold ${textClass}`}>
                  {item.name || "Product"}
                </p>

                <p className="mt-1 text-xs text-green-500">
                  {item.variantName || "Default Package"}
                </p>

                <p className={`mt-1 text-xs ${mutedClass}`}>
                  Quantity: {item.quantity || 1}
                </p>
              </div>

              <p className={`shrink-0 text-sm font-bold ${textClass}`}>
                {formatPrice(
                  Number(item.price || 0) * Number(item.quantity || 1),
                )}
              </p>
            </div>
          ))}

          {items.length === 0 && (
            <p className={`py-4 text-center text-sm ${mutedClass}`}>
              No product details available.
            </p>
          )}
        </div>

        <div
          className={`mt-5 border-t pt-5 ${
            isDark ? "border-white/10" : "border-gray-100"
          }`}
        >
          <div className="flex justify-between gap-3">
            <span className={`font-bold ${textClass}`}>Total Amount</span>
            <span className="text-xl font-extrabold text-green-500">
              {formatPrice(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-500/15 bg-green-500/5 p-4">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-green-500" />

        <p className={`text-xs leading-6 ${mutedClass}`}>
          This order is currently stored in your browser for demonstration.
          Payment verification and actual digital product delivery are not yet
          connected to a backend.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Link
          to="/my-orders"
          className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition hover:border-green-500 hover:text-green-500 ${
            isDark
              ? "border-white/10 text-white"
              : "border-gray-200 text-gray-700"
          }`}
        >
          <ClipboardList size={17} />
          View My Orders
        </Link>

        <Link
          to="/shop"
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
        >
          <ShoppingBag size={17} />
          Continue Shopping
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default OrderSuccess;
