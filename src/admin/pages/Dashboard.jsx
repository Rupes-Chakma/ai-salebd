import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  RefreshCw,
  Eye,
} from "lucide-react";

import useProductStore from "../../store/useProductStore";

const ORDER_KEY = "nexora-orders";

const formatPrice = (amount) =>
  `৳${Number.isFinite(Number(amount)) ? Number(amount).toLocaleString("en-BD") : "0"}`;

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const getOrderStatus = (status) =>
  status === "Pending Verification" ? "Pending" : status || "Pending";

const getStatusStyle = (status) => {
  switch (getOrderStatus(status)) {
    case "Confirmed":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";

    case "Processing":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "Completed":
      return "bg-green-500/10 text-green-400 border-green-500/20";

    case "Cancelled":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }
};

const readOrders = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const getCustomerIdentifier = (order) => {
  const phone = String(order.phone || "").trim();
  const email = String(order.email || "")
    .trim()
    .toLowerCase();
  const name = String(order.customerName || "")
    .trim()
    .toLowerCase();

  return phone || email || name;
};

function Dashboard() {
  const products = useProductStore((state) => state.products);

  const safeProducts = Array.isArray(products) ? products : [];

  const [orders, setOrders] = useState(readOrders);

  const refreshDashboard = () => {
    setOrders(readOrders());
  };

  const activeProducts = useMemo(
    () => safeProducts.filter((product) => product.status === "Active").length,
    [safeProducts],
  );

  const pendingOrders = useMemo(
    () =>
      orders.filter((order) => getOrderStatus(order.status) === "Pending")
        .length,
    [orders],
  );

  const totalCustomers = useMemo(() => {
    const customers = new Set();

    orders.forEach((order) => {
      const identifier = getCustomerIdentifier(order);

      if (identifier) {
        customers.add(identifier);
      }
    });

    return customers.size;
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.paymentStatus === "Paid" || order.paymentStatus === "Verified",
      )
      .reduce((sum, order) => {
        const amount = Number(order.total);
        return sum + (Number.isFinite(amount) && amount > 0 ? amount : 0);
      }, 0);
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return (
          (Number.isNaN(dateB) ? 0 : dateB) - (Number.isNaN(dateA) ? 0 : dateA)
        );
      })
      .slice(0, 5);
  }, [orders]);

  const stats = [
    {
      title: "Total Products",
      value: safeProducts.length,
      change: `${activeProducts} active products`,
      icon: Package,
    },
    {
      title: "Total Orders",
      value: orders.length,
      change: `${pendingOrders} pending orders`,
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      change: "Unique customers",
      icon: Users,
    },
    {
      title: "Total Revenue",
      value: formatPrice(totalRevenue),
      change: "Paid / verified orders",
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#AAA3C1]">
            Welcome to your AI-SaleBD admin dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={refreshDashboard}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#211B3B] px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#8B5CF6]"
        >
          <RefreshCw size={16} />
          Refresh Dashboard
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#211B3B] p-5 transition hover:border-purple-500/40"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-500/15 p-3 text-[#B99AFF]">
                  <Icon size={22} />
                </div>

                <ArrowUpRight size={18} className="text-[#AAA3C1]" />
              </div>

              <p className="mt-5 text-sm text-[#AAA3C1]">{card.title}</p>

              <h2 className="mt-1 text-2xl font-bold text-white">
                {card.value}
              </h2>

              <p className="mt-2 text-xs text-[#AAA3C1]">{card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="font-semibold text-white">Recent Orders</h2>

            <p className="mt-1 text-xs text-[#AAA3C1]">
              Latest customer orders
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#B99AFF]" />

            <Link
              to="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#B99AFF] hover:text-white"
            >
              View All
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {recentOrders.length === 0 ? (
          <div className="p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-[#B99AFF]">
              <TrendingUp size={26} />
            </div>

            <h3 className="mt-4 font-semibold text-white">No orders yet</h3>

            <p className="mt-2 text-sm text-[#AAA3C1]">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead className="bg-[#171329]">
                <tr className="text-xs text-[#AAA3C1]">
                  <th className="px-5 py-4 font-semibold">Order ID</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Total</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {recentOrders.map((order, index) => (
                  <tr
                    key={order.orderId || index}
                    className="transition hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <p className="max-w-[130px] break-all text-xs font-bold text-[#B99AFF]">
                        {order.orderId || "N/A"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-white">
                        {order.customerName || "Unknown Customer"}
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
                        className={`inline-block rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusStyle(order.status)}`}
                      >
                        {getOrderStatus(order.status)}
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
        )}
      </div>

      {/* LocalStorage Notice */}
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <p className="text-xs leading-5 text-[#AAA3C1]">
          Dashboard data currently comes from browser LocalStorage and the local
          product store. A secure shared database will be connected when the
          backend is implemented.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
