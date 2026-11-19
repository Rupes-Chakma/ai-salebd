import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  CalendarDays,
  CreditCard,
  Users,
  TrendingUp,
} from "lucide-react";

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

const getStatusStyle = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-400 border-green-500/20";

    case "Processing":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "Cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }
};

const getPaymentStyle = (status) => {
  if (status === "Paid" || status === "Verified") {
    return "bg-green-500/10 text-green-400";
  }

  if (status === "Failed" || status === "Rejected") {
    return "bg-red-500/10 text-red-400";
  }

  return "bg-yellow-500/10 text-yellow-400";
};

const readOrders = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

function Orders() {
  const [orders, setOrders] = useState(readOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const refreshOrders = () => {
    setOrders(readOrders());
  };

  const filteredOrders = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return [...orders]
      .filter((order) => {
        const matchesSearch =
          !query ||
          String(order.orderId || "")
            .toLowerCase()
            .includes(query) ||
          String(order.customerName || "")
            .toLowerCase()
            .includes(query) ||
          String(order.phone || "")
            .toLowerCase()
            .includes(query) ||
          String(order.email || "")
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" || order.status === statusFilter;

        const matchesPayment =
          paymentFilter === "All" || order.paymentStatus === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
      );
  }, [orders, searchTerm, statusFilter, paymentFilter]);

  const totalRevenue = orders
    .filter(
      (order) =>
        order.paymentStatus === "Paid" || order.paymentStatus === "Verified",
    )
    .reduce((sum, order) => sum + Number(order.total || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending Verification",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Completed Orders",
      value: completedOrders,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Verified Revenue",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Orders Management
          </h1>
          <p className="mt-1 text-sm text-[#AAA3C1]">
            View and manage all customer orders.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshOrders}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]"
        >
          <RefreshCw size={16} />
          Refresh Orders
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#211B3B] p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#AAA3C1]">{stat.label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-white">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-white/10 bg-[#211B3B] p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_200px_200px]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAA3C1]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Order ID, customer, phone..."
              className="w-full rounded-xl border border-white/10 bg-[#171329] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-[#77718D] focus:border-[#8B5CF6]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#171329] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
          >
            <option value="All">All Order Status</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#171329] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
          >
            <option value="All">All Payment Status</option>
            <option value="Not Paid">Not Paid</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Verified">Verified</option>
            <option value="Rejected">Rejected</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <p className="mt-3 text-xs text-[#77718D]">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="font-bold text-white">All Orders</h2>
            <p className="mt-1 text-xs text-[#AAA3C1]">
              Customer order records
            </p>
          </div>

          <Package size={21} className="text-[#B99AFF]" />
        </div>

        {filteredOrders.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Package size={40} className="mx-auto mb-3 text-[#8B5CF6]" />

            <h3 className="font-bold text-white">No Orders Found</h3>

            <p className="mt-2 text-sm text-[#AAA3C1]">
              No orders match your current search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Order Cards */}
            <div className="divide-y divide-white/10 lg:hidden">
              {filteredOrders.map((order, index) => (
                <div key={order.orderId || index} className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all text-sm font-bold text-[#B99AFF]">
                        {order.orderId || "N/A"}
                      </p>
                      <p className="mt-1 text-xs text-[#AAA3C1]">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(order.status)}`}
                    >
                      {order.status || "Pending Verification"}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {order.customerName || "Unknown Customer"}
                    </p>
                    <p className="mt-1 text-xs text-[#AAA3C1]">
                      {order.phone || "No phone"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] text-[#AAA3C1]">Total Amount</p>
                      <p className="mt-1 font-bold text-white">
                        {formatPrice(order.total)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-[#AAA3C1]">Payment</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${getPaymentStyle(order.paymentStatus)}`}
                      >
                        {order.paymentStatus || "Pending"}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/admin/orders/${encodeURIComponent(order.orderId || "")}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#8B5CF6]/40 py-2.5 text-xs font-bold text-[#B99AFF] transition hover:bg-[#8B5CF6]/10"
                  >
                    <Eye size={15} />
                    View Order Details
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-[#171329]">
                  <tr className="text-xs text-[#AAA3C1]">
                    <th className="px-5 py-4 font-semibold">Order ID</th>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                    <th className="px-5 py-4 font-semibold">Total</th>
                    <th className="px-5 py-4 font-semibold">Payment</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((order, index) => (
                    <tr
                      key={order.orderId || index}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <p className="max-w-[150px] break-all text-xs font-bold text-[#B99AFF]">
                          {order.orderId || "N/A"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-white">
                          {order.customerName || "Unknown"}
                        </p>
                        <p className="mt-1 text-xs text-[#AAA3C1]">
                          {order.phone || "No phone"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-xs text-[#AAA3C1]">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-white">
                        {formatPrice(order.total)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getPaymentStyle(order.paymentStatus)}`}
                        >
                          {order.paymentStatus || "Pending"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(order.status)}`}
                        >
                          {order.status || "Pending Verification"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/admin/orders/${encodeURIComponent(order.orderId || "")}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#8B5CF6]/40 px-3 py-2 text-xs font-bold text-[#B99AFF] transition hover:bg-[#8B5CF6]/10"
                        >
                          <Eye size={14} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <Users size={19} className="mt-0.5 shrink-0 text-yellow-400" />

        <p className="text-xs leading-5 text-[#AAA3C1]">
          This is currently a frontend demo using browser LocalStorage. Customer
          orders are not yet stored in a secure shared database.
        </p>
      </div>
    </div>
  );
}

export default Orders;
