import {
  Package,
  ShoppingCart,
  Users,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import useProductStore from "../../store/useProductStore";

const stats = [
  {
    title: "Total Orders",
    value: "0",
    change: "Orders received",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "0",
    change: "Registered customers",
    icon: Users,
  },
  {
    title: "Total Revenue",
    value: "৳0",
    change: "Total sales",
    icon: Wallet,
  },
];

function Dashboard() {
  // Get products from Zustand Store
  const products = useProductStore((state) => state.products);

  // Make sure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Count active products
  const activeProducts = safeProducts.filter(
    (product) => product.status === "Active",
  ).length;

  // Product Statistics
  const productStats = {
    title: "Total Products",
    value: safeProducts.length,
    change: `${activeProducts} active products`,
    icon: Package,
  };

  // All Statistics Cards
  const cards = [productStats, ...stats];

  return (
    <div className="space-y-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>

        <p className="mt-2 text-sm text-[#AAA3C1]">
          Welcome to your NEXORA admin dashboard.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
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

              <h2 className="mt-1 text-2xl font-bold">{card.value}</h2>

              <p className="mt-2 text-xs text-[#AAA3C1]">{card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <div>
            <h2 className="font-semibold">Recent Orders</h2>

            <p className="mt-1 text-xs text-[#AAA3C1]">
              Latest customer orders
            </p>
          </div>

          <Clock size={20} className="text-[#B99AFF]" />
        </div>

        <div className="p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-[#B99AFF]">
            <TrendingUp size={26} />
          </div>

          <h3 className="mt-4 font-semibold">No orders yet</h3>

          <p className="mt-2 text-sm text-[#AAA3C1]">
            Customer orders will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
