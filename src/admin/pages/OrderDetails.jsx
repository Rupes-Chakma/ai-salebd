import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Package,
  CreditCard,
  CalendarDays,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  Truck,
  Hash,
} from "lucide-react";
import toast from "react-hot-toast";

const ORDER_KEY = "nexora-orders";

const orderStatuses = [
  "Pending Verification",
  "Processing",
  "Completed",
  "Cancelled",
];

const paymentStatuses = ["Not Paid", "Pending", "Verified", "Rejected"];

const deliveryMethods = ["Not Selected", "WhatsApp", "Email", "Both"];

const deliveryStatuses = ["Pending", "Delivered"];

const formatPrice = (amount) =>
  `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return parsed.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const readOrders = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(ORDER_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

function DetailCard({ title, icon: Icon, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#211B3B]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-[#B99AFF]">
          <Icon size={19} />
        </div>

        <h2 className="font-bold text-white">{title}</h2>
      </div>

      <div className="space-y-4 p-5">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
      <span className="text-sm text-[#AAA3C1]">{label}</span>
      <span className="break-all text-sm font-medium text-white sm:text-right">
        {value || "Not provided"}
      </span>
    </div>
  );
}

function StatusSelect({ label, value, options, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-[#AAA3C1]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#171329] px-4 py-3 text-sm text-white outline-none transition focus:border-[#8B5CF6]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const foundOrder = readOrders().find(
      (item) => String(item.orderId) === String(orderId),
    );

    if (foundOrder) {
      setOrder(foundOrder);

      setFormData({
        status: foundOrder.status || "Pending Verification",
        paymentStatus: foundOrder.paymentStatus || "Not Paid",
        deliveryMethod: foundOrder.deliveryMethod || "Not Selected",
        deliveryStatus: foundOrder.deliveryStatus || "Pending",
      });
    }
  }, [orderId]);

  const handleSave = () => {
    if (!order || !formData) return;

    if (
      formData.paymentStatus === "Verified" &&
      !["Verified", "Paid"].includes(order.paymentStatus)
    ) {
      const confirmed = window.confirm(
        "আপনি কি নিশ্চিত যে এই অর্ডারের পেমেন্ট যাচাই করেছেন?",
      );

      if (!confirmed) return;
    }

    if (
      formData.deliveryStatus === "Delivered" &&
      formData.deliveryMethod === "Not Selected"
    ) {
      toast.error("প্রথমে Delivery Method নির্বাচন করুন।");
      return;
    }

    if (
      formData.deliveryStatus === "Delivered" &&
      !["Verified", "Paid"].includes(formData.paymentStatus)
    ) {
      toast.error("পেমেন্ট Verify না করে Delivered করা যাবে না।");
      return;
    }

    const updatedOrder = {
      ...order,
      ...formData,
      paymentVerifiedAt:
        formData.paymentStatus === "Verified"
          ? order.paymentVerifiedAt || new Date().toISOString()
          : order.paymentVerifiedAt || "",
      deliveredAt:
        formData.deliveryStatus === "Delivered"
          ? order.deliveredAt || new Date().toISOString()
          : "",
      updatedAt: new Date().toISOString(),
    };

    const allOrders = readOrders();

    const updatedOrders = allOrders.map((item) =>
      String(item.orderId) === String(orderId) ? updatedOrder : item,
    );

    localStorage.setItem(ORDER_KEY, JSON.stringify(updatedOrders));

    setOrder(updatedOrder);
    setFormData({
      status: updatedOrder.status,
      paymentStatus: updatedOrder.paymentStatus,
      deliveryMethod: updatedOrder.deliveryMethod,
      deliveryStatus: updatedOrder.deliveryStatus,
    });

    toast.success("Order successfully updated!");
  };

  if (!order || !formData) {
    return (
      <div className="space-y-5">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B99AFF] hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#211B3B] px-5 py-16 text-center">
          <AlertCircle size={42} className="mx-auto mb-3 text-yellow-400" />

          <h2 className="text-lg font-bold text-white">Order Not Found</h2>

          <p className="mt-2 text-sm text-[#AAA3C1]">
            এই Order ID-এর কোনো অর্ডার পাওয়া যায়নি।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            to="/admin/orders"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#B99AFF] transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>

          <h1 className="text-2xl font-extrabold text-white">Order Details</h1>

          <p className="mt-1 break-all text-sm text-[#AAA3C1]">
            Order ID: {order.orderId}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D5DFB] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>

      {/* Order Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Order Total",
            value: formatPrice(order.total),
            icon: Package,
          },
          {
            label: "Payment Method",
            value: order.paymentMethod || "Not selected",
            icon: CreditCard,
          },
          {
            label: "Order Date",
            value: formatDate(order.createdAt),
            icon: CalendarDays,
          },
          {
            label: "Delivery Method",
            value: formData.deliveryMethod,
            icon: Truck,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#211B3B] p-5"
            >
              <div className="flex items-center gap-2 text-[#AAA3C1]">
                <Icon size={17} />
                <span className="text-xs">{item.label}</span>
              </div>

              <p className="mt-3 break-words text-lg font-bold text-white">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Customer Information */}
        <DetailCard title="Customer Information" icon={User}>
          <InfoRow label="Customer Name" value={order.customerName} />
          <InfoRow label="Phone Number" value={order.phone} />
          <InfoRow label="Email Address" value={order.email} />
          <InfoRow label="Delivery Address" value={order.deliveryAddress} />

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
            {order.phone && (
              <a
                href={`https://wa.me/${String(order.phone).replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2.5 text-xs font-bold text-green-400 hover:bg-green-500/20"
              >
                <Phone size={15} />
                WhatsApp Customer
              </a>
            )}

            {order.email && (
              <a
                href={`mailto:${order.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 px-4 py-2.5 text-xs font-bold text-blue-400 hover:bg-blue-500/20"
              >
                <Mail size={15} />
                Email Customer
              </a>
            )}
          </div>
        </DetailCard>

        {/* Payment Information */}
        <DetailCard title="Payment Information" icon={CreditCard}>
          <InfoRow label="Payment Method" value={order.paymentMethod} />
          <InfoRow label="Sender Number" value={order.senderNumber} />
          <InfoRow label="Transaction ID" value={order.transactionId} />
          <InfoRow label="Payment Status" value={order.paymentStatus} />

          <div className="border-t border-white/10 pt-4">
            <StatusSelect
              label="Update Payment Status"
              value={formData.paymentStatus}
              options={paymentStatuses}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  paymentStatus: value,
                }))
              }
            />
          </div>
        </DetailCard>

        {/* Ordered Products */}
        <DetailCard title="Ordered Products" icon={Package}>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div
                key={`${item.productId || item.name || "item"}-${index}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#171329] p-4"
              >
                <div className="min-w-0">
                  <p className="break-words text-sm font-bold text-white">
                    {item.name || "Digital Product"}
                  </p>

                  <p className="mt-1 text-xs text-[#AAA3C1]">
                    Package: {item.variantName || "Default"}
                  </p>

                  <p className="mt-1 text-xs text-[#AAA3C1]">
                    Quantity: {item.quantity || 1}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold text-[#B99AFF]">
                  {formatPrice(
                    Number(item.price || 0) * Number(item.quantity || 1),
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#AAA3C1]">
              No product information available.
            </p>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="font-semibold text-[#AAA3C1]">Total Amount</span>

            <span className="text-xl font-extrabold text-white">
              {formatPrice(order.total)}
            </span>
          </div>
        </DetailCard>

        {/* Order & Delivery Management */}
        <DetailCard title="Order & Delivery Management" icon={Truck}>
          <StatusSelect
            label="Order Status"
            value={formData.status}
            options={orderStatuses}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                status: value,
              }))
            }
          />

          <StatusSelect
            label="Delivery Method"
            value={formData.deliveryMethod}
            options={deliveryMethods}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                deliveryMethod: value,
              }))
            }
          />

          <StatusSelect
            label="Delivery Status"
            value={formData.deliveryStatus}
            options={deliveryStatuses}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                deliveryStatus: value,
              }))
            }
          />

          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <div className="flex items-center gap-2 text-[#B99AFF]">
              <Hash size={17} />
              <p className="text-sm font-bold">Delivery Workflow</p>
            </div>

            <p className="mt-2 text-xs leading-5 text-[#AAA3C1]">
              Payment verify করার পর WhatsApp বা Email-এর মাধ্যমে Digital
              Product পাঠিয়ে Delivery Status Delivered করুন। এই পেজ নিজে থেকে
              কোনো পণ্য বা License পাঠায় না।
            </p>
          </div>
        </DetailCard>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D5DFB] px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
        >
          <CheckCircle2 size={17} />
          Save Order Updates
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
