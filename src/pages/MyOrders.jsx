import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  CreditCard,
  Hash,
  RefreshCw,
  Trash2,
  Ban,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const ORDER_KEY = "nexora-orders";

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Not available";

  return parsedDate.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

function getStatusStyle(status) {
  switch (status) {
    case "Completed":
      return {
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        icon: CheckCircle2,
      };

    case "Cancelled":
      return {
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: XCircle,
      };

    case "Processing":
      return {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: Package,
      };

    default:
      return {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: Clock,
      };
  }
}

function getOrdersFromStorage() {
  try {
    const savedOrders = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");

    if (!Array.isArray(savedOrders)) return [];

    return [...savedOrders].sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    );
  } catch {
    return [];
  }
}

function MyOrders() {
  const { isDark } = useTheme();

  const [orders, setOrders] = useState(getOrdersFromStorage);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [confirmAction, setConfirmAction] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const cardClass = isDark
    ? "border-white/10 bg-[#141A15]"
    : "border-gray-200 bg-white shadow-sm";

  const textClass = isDark ? "text-white" : "text-gray-900";
  const mutedClass = isDark ? "text-[#A3ADA4]" : "text-gray-500";

  const inputClass = isDark
    ? "border-white/10 bg-[#141A15] text-white placeholder:text-gray-500"
    : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400";

  const saveOrders = (updatedOrders) => {
    try {
      localStorage.setItem(ORDER_KEY, JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
      return true;
    } catch (error) {
      console.error("Order update error:", error);
      toast.error("Could not update order. Please try again.");
      return false;
    }
  };

  // Cancel Order
  const handleCancelOrder = (orderId) => {
    const targetOrder = orders.find((order) => order.orderId === orderId);

    if (!targetOrder) {
      toast.error("Order not found.");
      setConfirmAction(null);
      return;
    }

    if (targetOrder.status !== "Pending Verification") {
      toast.error("This order can no longer be cancelled.");
      setConfirmAction(null);
      return;
    }

    setIsUpdating(true);

    const updatedOrders = orders.map((order) =>
      order.orderId === orderId
        ? {
            ...order,
            status: "Cancelled",
            deliveryStatus: "Cancelled",
            cancelledAt: new Date().toISOString(),
          }
        : order,
    );

    if (saveOrders(updatedOrders)) {
      toast.success("Order cancelled successfully.");
    }

    setConfirmAction(null);
    setIsUpdating(false);
  };

  // Delete Cancelled Order
  const handleDeleteOrder = (orderId) => {
    const targetOrder = orders.find((order) => order.orderId === orderId);

    if (!targetOrder) {
      toast.error("Order not found.");
      setConfirmAction(null);
      return;
    }

    if (targetOrder.status !== "Cancelled") {
      toast.error("Only cancelled orders can be deleted.");
      setConfirmAction(null);
      return;
    }

    setIsUpdating(true);

    const updatedOrders = orders.filter((order) => order.orderId !== orderId);

    if (saveOrders(updatedOrders)) {
      setExpandedOrders((current) => current.filter((id) => id !== orderId));

      toast.success("Order deleted from your history.");
    }

    setConfirmAction(null);
    setIsUpdating(false);
  };

  // Confirmation Action
  const handleConfirmAction = () => {
    if (!confirmAction || isUpdating) return;

    if (confirmAction.type === "cancel") {
      handleCancelOrder(confirmAction.orderId);
    } else if (confirmAction.type === "delete") {
      handleDeleteOrder(confirmAction.orderId);
    }
  };

  // Search Orders
  const filteredOrders = orders.filter((order) => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return true;

    return (
      String(order.orderId || "")
        .toLowerCase()
        .includes(query) ||
      String(order.status || "")
        .toLowerCase()
        .includes(query) ||
      String(order.paymentMethod || "")
        .toLowerCase()
        .includes(query) ||
      String(order.paymentStatus || "")
        .toLowerCase()
        .includes(query) ||
      (order.items || []).some((item) =>
        `${item.name || ""} ${item.variantName || ""}`
          .toLowerCase()
          .includes(query),
      )
    );
  });

  // Expand / Collapse Order
  const toggleOrder = (orderId) => {
    setExpandedOrders((current) =>
      current.includes(orderId)
        ? current.filter((id) => id !== orderId)
        : [...current, orderId],
    );
  };

  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0,
  );

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  // Empty Orders
  if (orders.length === 0) {
    return (
      <section className="container-custom flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
        <div
          className={`relative w-full max-w-md overflow-hidden rounded-3xl border px-6 py-12 shadow-xl ${
            isDark ? "border-white/10 bg-[#141A15]" : "border-gray-200 bg-white"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative">
            <div
              className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border ${
                isDark
                  ? "border-green-500/20 bg-green-500/10"
                  : "border-green-200 bg-green-50"
              }`}
            >
              <Package size={42} className="text-green-500" />
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-500">
              <Sparkles size={12} />
              AI-SaleBD
            </span>

            <h1
              className={`mt-5 text-2xl font-extrabold sm:text-3xl ${textClass}`}
            >
              No Orders Yet
            </h1>

            <p className={`mt-3 text-sm leading-7 ${mutedClass}`}>
              You haven't placed any orders yet. Explore our digital products
              and place your first order.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-700"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-custom min-h-screen py-7 pb-28 sm:py-10">
      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div
            className={`w-full max-w-md rounded-2xl border p-5 shadow-2xl sm:p-6 ${cardClass}`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  confirmAction.type === "cancel"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-orange-500/10 text-orange-500"
                }`}
              >
                {confirmAction.type === "cancel" ? (
                  <Ban size={24} />
                ) : (
                  <Trash2 size={24} />
                )}
              </div>

              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                disabled={isUpdating}
                className={`rounded-lg p-2 transition hover:bg-gray-500/10 disabled:opacity-50 ${mutedClass}`}
                aria-label="Close confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className={`mt-5 text-xl font-bold ${textClass}`}>
              {confirmAction.type === "cancel"
                ? "Cancel This Order?"
                : "Delete This Order?"}
            </h2>

            <p className={`mt-2 text-sm leading-6 ${mutedClass}`}>
              {confirmAction.type === "cancel"
                ? "Are you sure you want to cancel this order? This action will change the order status to Cancelled."
                : "Are you sure you want to permanently delete this cancelled order from your order history? This cannot be undone."}
            </p>

            <p className="mt-3 break-all rounded-lg border border-green-500/10 bg-green-500/5 p-3 text-xs font-semibold text-green-500">
              Order ID: {confirmAction.orderId}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmAction(null)}
                disabled={isUpdating}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold transition hover:bg-gray-500/5 disabled:opacity-50 ${
                  isDark
                    ? "border-white/10 text-white"
                    : "border-gray-200 text-gray-700"
                }`}
              >
                Go Back
              </button>

              <button
                type="button"
                onClick={handleConfirmAction}
                disabled={isUpdating}
                className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white transition disabled:opacity-50 ${
                  confirmAction.type === "cancel"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-orange-600 hover:bg-orange-700"
                }`}
              >
                {isUpdating
                  ? "Processing..."
                  : confirmAction.type === "cancel"
                    ? "Yes, Cancel"
                    : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-7">
        <div className={`flex items-center gap-2 text-sm ${mutedClass}`}>
          <Link to="/" className="transition hover:text-green-500">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-green-500">My Orders</span>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <span className="rounded-lg border border-green-500/20 bg-green-500/10 p-2 text-green-500">
            <Package size={20} />
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-500">
            Order Management
          </span>
        </div>

        <h1 className={`mt-3 text-2xl font-extrabold sm:text-3xl ${textClass}`}>
          My Orders
        </h1>

        <p className={`mt-2 text-sm ${mutedClass}`}>
          View your order history and manage your orders.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div
          className={`rounded-2xl border p-4 transition hover:border-green-500/30 ${cardClass}`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <Package size={19} />
          </div>

          <p className={`text-xs ${mutedClass}`}>Total Orders</p>

          <p className={`mt-1 text-2xl font-extrabold ${textClass}`}>
            {orders.length}
          </p>
        </div>

        <div
          className={`rounded-2xl border p-4 transition hover:border-green-500/30 ${cardClass}`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <ShoppingBag size={19} />
          </div>

          <p className={`text-xs ${mutedClass}`}>Total Order Value</p>

          <p className={`mt-1 text-xl font-extrabold sm:text-2xl ${textClass}`}>
            {formatPrice(totalSpent)}
          </p>
        </div>

        <div
          className={`col-span-2 rounded-2xl border p-4 transition hover:border-green-500/30 sm:col-span-1 ${cardClass}`}
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
            <CheckCircle2 size={19} />
          </div>

          <p className={`text-xs ${mutedClass}`}>Completed Orders</p>

          <p className={`mt-1 text-2xl font-extrabold ${textClass}`}>
            {completedOrders}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search
            size={19}
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${mutedClass}`}
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order ID, product or status..."
            className={`w-full rounded-xl border py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/10 ${inputClass}`}
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition hover:text-green-500 ${mutedClass}`}
              aria-label="Clear search"
            >
              <RefreshCw size={16} />
            </button>
          )}
        </div>

        <p className={`mt-2 text-xs ${mutedClass}`}>
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* Orders */}
      {filteredOrders.length === 0 ? (
        <div
          className={`rounded-2xl border px-5 py-12 text-center ${cardClass}`}
        >
          <Search size={35} className="mx-auto mb-3 text-green-500" />

          <h2 className={`font-bold ${textClass}`}>No matching orders</h2>

          <p className={`mt-2 text-sm ${mutedClass}`}>
            Try searching with another keyword.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order, index) => {
            const status = getStatusStyle(order.status);
            const StatusIcon = status.icon;
            const isExpanded = expandedOrders.includes(order.orderId);

            const canCancel = order.status === "Pending Verification";
            const canDelete = order.status === "Cancelled";

            return (
              <article
                key={order.orderId || index}
                className={`overflow-hidden rounded-2xl border transition duration-300 hover:border-green-500/20 ${cardClass}`}
              >
                <div className="p-4 sm:p-5">
                  {/* Order Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`text-xs ${mutedClass}`}>Order ID</p>

                      <p className="mt-1 break-all text-sm font-bold text-green-500 sm:text-base">
                        {order.orderId || "Not available"}
                      </p>

                      <p
                        className={`mt-2 flex items-center gap-1.5 text-xs ${mutedClass}`}
                      >
                        <CalendarDays size={14} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.color} ${status.bg} ${status.border}`}
                    >
                      <StatusIcon size={14} />
                      {order.status || "Pending Verification"}
                    </div>
                  </div>

                  <div
                    className={`my-4 border-t ${
                      isDark ? "border-white/10" : "border-gray-100"
                    }`}
                  />

                  {/* Products */}
                  <div className="space-y-3">
                    {(order.items || []).map((item, itemIndex) => (
                      <div
                        key={`${order.orderId}-${item.cartId || itemIndex}`}
                        className="flex items-center gap-3"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || "Product"}
                            loading="lazy"
                            className="h-12 w-12 rounded-xl border border-gray-500/20 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10">
                            <Package size={20} className={mutedClass} />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-semibold ${textClass}`}
                          >
                            {item.name || "Digital Product"}
                          </p>

                          <p className={`mt-1 text-xs ${mutedClass}`}>
                            {item.variantName || "Default"} ×{" "}
                            {item.quantity || 1}
                          </p>
                        </div>

                        <p
                          className={`shrink-0 text-sm font-semibold ${textClass}`}
                        >
                          {formatPrice(
                            Number(item.price || 0) *
                              Number(item.quantity || 1),
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className={`my-4 border-t ${
                      isDark ? "border-white/10" : "border-gray-100"
                    }`}
                  />

                  {/* Payment and Total */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p
                        className={`flex items-center gap-1.5 text-xs ${mutedClass}`}
                      >
                        <CreditCard size={13} />
                        Payment Method
                      </p>

                      <p className={`mt-1 text-sm font-semibold ${textClass}`}>
                        {order.paymentMethod || "Not available"}
                      </p>
                    </div>

                    <div>
                      <p className={`text-xs ${mutedClass}`}>Payment Status</p>

                      <p className="mt-1 text-sm font-semibold text-amber-500">
                        {order.paymentStatus || "Pending"}
                      </p>
                    </div>

                    <div className="col-span-2 flex items-center justify-between gap-3 rounded-xl border border-green-500/10 bg-green-500/5 p-3">
                      <span className={`text-sm ${mutedClass}`}>
                        Total Amount
                      </span>

                      <span className="text-lg font-extrabold text-green-500">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  {(canCancel || canDelete) && (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {canCancel && (
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmAction({
                              type: "cancel",
                              orderId: order.orderId,
                            })
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500/20"
                        >
                          <Ban size={16} />
                          Cancel Order
                        </button>
                      )}

                      {canDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmAction({
                              type: "delete",
                              orderId: order.orderId,
                            })
                          }
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={16} />
                          Delete Order
                        </button>
                      )}
                    </div>
                  )}

                  {/* Details Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(order.orderId)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/20 py-3 text-sm font-semibold text-green-500 transition hover:border-green-500/40 hover:bg-green-500/5"
                  >
                    {isExpanded ? (
                      <>
                        Hide Order Details <ChevronUp size={17} />
                      </>
                    ) : (
                      <>
                        View Order Details <ChevronDown size={17} />
                      </>
                    )}
                  </button>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div
                      className={`mt-4 space-y-3 rounded-xl border p-4 ${
                        isDark
                          ? "border-white/10 bg-black/20"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <h3 className={`text-sm font-bold ${textClass}`}>
                        Additional Information
                      </h3>

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className={mutedClass}>Customer Name</span>
                        <span className={`text-right ${textClass}`}>
                          {order.customerName || "Not available"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className={mutedClass}>Phone Number</span>
                        <span className={`text-right ${textClass}`}>
                          {order.phone || "Not available"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className={mutedClass}>Email Address</span>
                        <span className={`break-all text-right ${textClass}`}>
                          {order.email || "Not provided"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className={mutedClass}>Transaction ID</span>
                        <span className={`break-all text-right ${textClass}`}>
                          {order.transactionId || "Not available"}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span className={mutedClass}>Delivery Method</span>
                        <span className={`text-right ${textClass}`}>
                          {order.deliveryMethod || "Not selected"}
                        </span>
                      </div>

                      {order.cancelledAt && (
                        <div className="flex items-start justify-between gap-3 text-sm">
                          <span className={mutedClass}>Cancelled At</span>
                          <span className="text-right text-red-500">
                            {formatDate(order.cancelledAt)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3 text-sm">
                        <span
                          className={`flex items-center gap-1 ${mutedClass}`}
                        >
                          <Hash size={13} />
                          Order Reference
                        </span>

                        <span className={`break-all text-right ${textClass}`}>
                          {order.orderId || "Not available"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Continue Shopping */}
      <Link
        to="/shop"
        className="mt-7 inline-flex items-center gap-2 rounded-xl border border-green-500/30 px-5 py-3 text-sm font-bold text-green-500 transition hover:bg-green-500/10"
      >
        <ShoppingBag size={17} />
        Continue Shopping
        <ArrowRight size={15} />
      </Link>
    </section>
  );
}

export default MyOrders;
