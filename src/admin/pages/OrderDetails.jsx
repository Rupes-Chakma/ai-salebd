import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  Package,
  CreditCard,
  CalendarDays,
  Save,
  CheckCircle2,
  AlertCircle,
  Truck,
  Hash,
  Warehouse,
  MinusCircle,
  MessageCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import useProductStore from "../../store/useProductStore";

const ORDER_KEY = "nexora-orders";

const orderStatuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Completed",
  "Cancelled",
];

const paymentStatuses = ["Not Paid", "Pending", "Paid", "Verified", "Rejected"];

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

const saveOrders = (orders) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
};

const normalize = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const getVariantIndex = (product, item) => {
  if (!Array.isArray(product?.variants) || !product.variants.length) {
    return -1;
  }

  return product.variants.findIndex((variant) => {
    const variantId = String(variant.id ?? variant.name ?? "default");
    const itemVariantId = String(
      item.variantId ?? item.variantName ?? "default",
    );

    return (
      variantId === itemVariantId ||
      normalize(variant.name) === normalize(item.variantName)
    );
  });
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
        className="w-full rounded-xl border border-white/10 bg-[#171329] px-4 py-3 text-sm text-white outline-none focus:border-[#8B5CF6]"
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

  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deducting, setDeducting] = useState(false);

  const products = useProductStore((state) => state.products);
  const updateProduct = useProductStore((state) => state.updateProduct);

  useEffect(() => {
    const foundOrder = readOrders().find(
      (item) => String(item.orderId) === String(orderId),
    );

    if (!foundOrder) {
      setOrder(null);
      setFormData(null);
      return;
    }

    setOrder(foundOrder);

    setFormData({
      status:
        foundOrder.status === "Pending Verification"
          ? "Pending"
          : foundOrder.status || "Pending",
      paymentStatus: foundOrder.paymentStatus || "Not Paid",
      deliveryMethod: foundOrder.deliveryMethod || "Not Selected",
      deliveryStatus: foundOrder.deliveryStatus || "Pending",
    });
  }, [orderId]);

  const stockPreview = useMemo(() => {
    if (!order || !Array.isArray(order.items)) return [];

    return order.items.map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.productId),
      );

      if (!product) {
        return {
          name: item.name || "Unknown Product",
          quantity: Number(item.quantity || 1),
          issue: "Product not found",
        };
      }

      const quantity = Math.max(1, Number(item.quantity || 1));
      const variantIndex = getVariantIndex(product, item);

      if (Array.isArray(product.variants) && product.variants.length) {
        if (variantIndex < 0) {
          return {
            name: item.name || product.name,
            quantity,
            issue: "Variant not found",
          };
        }

        const variant = product.variants[variantIndex];

        return {
          name: product.name,
          variantName: variant.name,
          quantity,
          stock: Number(variant.stock ?? 0),
          available:
            Number.isFinite(Number(variant.stock)) &&
            Number(variant.stock) >= quantity,
          issue: !Number.isFinite(Number(variant.stock))
            ? "Invalid stock value"
            : Number(variant.stock) < quantity
              ? "Insufficient stock"
              : "",
        };
      }

      return {
        name: product.name,
        quantity,
        stock: Number(product.stock ?? 0),
        available:
          Number.isFinite(Number(product.stock)) &&
          Number(product.stock) >= quantity,
        issue: !Number.isFinite(Number(product.stock))
          ? "Invalid stock value"
          : Number(product.stock) < quantity
            ? "Insufficient stock"
            : "",
      };
    });
  }, [order, products]);

  const stockIssues = stockPreview.filter((item) => item.issue);

  const handleSave = () => {
    if (!order || !formData || saving) return;

    if (
      formData.status === "Confirmed" &&
      formData.paymentStatus !== "Verified"
    ) {
      toast.error("অর্ডার Confirm করার আগে Payment Verify করুন।");
      return;
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
      formData.paymentStatus !== "Verified"
    ) {
      toast.error("Payment Verify না করে Delivered করা যাবে না।");
      return;
    }

    if (
      formData.status === "Completed" &&
      formData.deliveryStatus !== "Delivered"
    ) {
      toast.error("Completed করার আগে Delivery Status Delivered করুন।");
      return;
    }

    if (formData.status === "Completed" && !order.stockDeducted) {
      toast.error("Completed করার আগে Manual Stock Deduction করুন।");
      return;
    }

    if (formData.status === "Cancelled" && order.stockDeducted) {
      toast.error(
        "এই অর্ডারের Stock ইতোমধ্যে কমানো হয়েছে। Stock পুনরুদ্ধার আলাদাভাবে করতে হবে।",
      );
      return;
    }

    setSaving(true);

    try {
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

      saveOrders(updatedOrders);

      setOrder(updatedOrder);
      setFormData({
        status: updatedOrder.status,
        paymentStatus: updatedOrder.paymentStatus,
        deliveryMethod: updatedOrder.deliveryMethod,
        deliveryStatus: updatedOrder.deliveryStatus,
      });

      toast.success("Order successfully updated!");
    } catch {
      toast.error("Order update করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  const handleStockDeduction = () => {
    if (!order || deducting) return;

    if (order.stockDeducted) {
      toast.error("এই Order-এর Stock আগেই কমানো হয়েছে।");
      return;
    }

    if (order.status !== "Confirmed") {
      toast.error("প্রথমে Order Confirm করুন।");
      return;
    }

    if (order.paymentStatus !== "Verified") {
      toast.error("প্রথমে Payment Verify করুন।");
      return;
    }

    if (!Array.isArray(order.items) || !order.items.length) {
      toast.error("এই Order-এ কোনো Product পাওয়া যায়নি।");
      return;
    }

    if (stockIssues.length > 0) {
      toast.error("Stock বা Product সংক্রান্ত সমস্যা আছে।");
      return;
    }

    const confirmed = window.confirm(
      "আপনি কি নিশ্চিত? এই Order-এর Product Stock কমানো হবে। এই কাজ Undo করা যাবে না।",
    );

    if (!confirmed) return;

    setDeducting(true);

    try {
      const latestProducts = useProductStore.getState().products;
      const update = useProductStore.getState().updateProduct;

      const changes = [];

      for (const item of order.items) {
        const product = latestProducts.find(
          (p) => String(p.id) === String(item.productId),
        );

        if (!product) {
          throw new Error(`Product পাওয়া যায়নি: ${item.name}`);
        }

        const quantity = Math.max(1, Number(item.quantity || 1));

        if (Array.isArray(product.variants) && product.variants.length) {
          const variantIndex = getVariantIndex(product, item);

          if (variantIndex < 0) {
            throw new Error(`Variant পাওয়া যায়নি: ${item.variantName}`);
          }

          const variants = product.variants.map((variant, index) => {
            if (index !== variantIndex) return variant;

            const currentStock = Number(variant.stock);

            if (!Number.isFinite(currentStock) || currentStock < quantity) {
              throw new Error(`Insufficient stock: ${product.name}`);
            }

            return {
              ...variant,
              stock: currentStock - quantity,
            };
          });

          changes.push({
            id: product.id,
            data: { variants },
          });
        } else {
          const currentStock = Number(product.stock);

          if (!Number.isFinite(currentStock) || currentStock < quantity) {
            throw new Error(`Insufficient stock: ${product.name}`);
          }

          changes.push({
            id: product.id,
            data: { stock: currentStock - quantity },
          });
        }
      }

      // একই Product-এর একাধিক Variant থাকলেও আলাদা stock update রাখা হয়েছে।
      const productUpdates = new Map();

      for (const change of changes) {
        const existing = productUpdates.get(String(change.id));

        if (existing) {
          productUpdates.set(String(change.id), {
            id: change.id,
            data: {
              ...existing.data,
              ...change.data,
            },
          });
        } else {
          productUpdates.set(String(change.id), change);
        }
      }

      // Product Store update
      for (const change of productUpdates.values()) {
        update(change.id, change.data);
      }

      const updatedOrder = {
        ...order,
        stockDeducted: true,
        stockDeductedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const allOrders = readOrders();

      const updatedOrders = allOrders.map((item) =>
        String(item.orderId) === String(orderId) ? updatedOrder : item,
      );

      saveOrders(updatedOrders);
      setOrder(updatedOrder);

      toast.success("Product Stock successfully deducted!");
    } catch (error) {
      toast.error(error.message || "Stock update করা যায়নি।");
    } finally {
      setDeducting(false);
    }
  };

  if (!order || !formData) {
    return (
      <div className="space-y-5">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#B99AFF]"
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

  const whatsappNumber = String(order.phone || "").replace(/\D/g, "");

  const whatsappMessage = encodeURIComponent(
    `Hello ${order.customerName || ""}, regarding your order ${order.orderId}. Thank you for shopping with AI-SaleBD.`,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            to="/admin/orders"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#B99AFF] hover:text-white"
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
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D5DFB] px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          <Save size={17} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

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
        <DetailCard title="Customer Information" icon={User}>
          <InfoRow label="Customer Name" value={order.customerName} />
          <InfoRow label="Phone Number" value={order.phone} />
          <InfoRow label="Email Address" value={order.email} />
          <InfoRow label="Delivery Address" value={order.deliveryAddress} />

          <div className="flex flex-wrap gap-3 border-t border-white/10 pt-4">
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-2.5 text-xs font-bold text-green-400 hover:bg-green-500/20"
              >
                <MessageCircle size={15} />
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

        <DetailCard title="Payment Information" icon={CreditCard}>
          <InfoRow label="Payment Method" value={order.paymentMethod} />
          <InfoRow label="Sender Number" value={order.senderNumber} />
          <InfoRow label="Transaction ID" value={order.transactionId} />
          <InfoRow label="Current Payment Status" value={order.paymentStatus} />

          <div className="border-t border-white/10 pt-4">
            <StatusSelect
              label="Update Payment Status"
              value={formData.paymentStatus}
              options={paymentStatuses}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, paymentStatus: value }))
              }
            />
          </div>
        </DetailCard>

        <DetailCard title="Ordered Products" icon={Package}>
          {Array.isArray(order.items) && order.items.length ? (
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

        <DetailCard title="Order & Delivery Management" icon={Truck}>
          <StatusSelect
            label="Order Status"
            value={formData.status}
            options={orderStatuses}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, status: value }))
            }
          />

          <StatusSelect
            label="Delivery Method"
            value={formData.deliveryMethod}
            options={deliveryMethods}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, deliveryMethod: value }))
            }
          />

          <StatusSelect
            label="Delivery Status"
            value={formData.deliveryStatus}
            options={deliveryStatuses}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, deliveryStatus: value }))
            }
          />

          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
            <div className="flex items-center gap-2 text-[#B99AFF]">
              <Hash size={17} />
              <p className="text-sm font-bold">Delivery Workflow</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#AAA3C1]">
              Payment Verify করুন। এরপর WhatsApp বা Email দিয়ে Digital Product
              পাঠান। Delivery সম্পন্ন হলে Delivered নির্বাচন করুন।
            </p>
          </div>
        </DetailCard>
      </div>

      <DetailCard title="Manual Stock Management" icon={Warehouse}>
        {order.stockDeducted ? (
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle2 size={20} />
              <p className="font-bold">Stock Already Deducted</p>
            </div>
            <p className="mt-2 text-xs text-[#AAA3C1]">
              {formatDate(order.stockDeductedAt)}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {stockPreview.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#171329] p-4"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{item.name}</p>
                    {item.variantName && (
                      <p className="mt-1 text-xs text-[#AAA3C1]">
                        {item.variantName}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#AAA3C1]">
                      Order Quantity: {item.quantity}
                      {item.stock !== undefined &&
                        ` · Available: ${item.stock}`}
                    </p>
                  </div>
                  {item.issue ? (
                    <span className="text-xs font-semibold text-red-400">
                      {item.issue}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-green-400">
                      Stock Available
                    </span>
                  )}
                </div>
              ))}
            </div>

            {stockIssues.length > 0 && (
              <p className="text-xs text-red-400">
                Stock deduction-এর আগে Product বা Variant সমস্যা সমাধান করুন।
              </p>
            )}

            <button
              type="button"
              onClick={handleStockDeduction}
              disabled={
                deducting ||
                stockIssues.length > 0 ||
                order.status !== "Confirmed" ||
                order.paymentStatus !== "Verified"
              }
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D5DFB] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <MinusCircle size={17} />
              {deducting ? "Updating Stock..." : "Deduct Stock Manually"}
            </button>

            <p className="text-xs leading-5 text-[#AAA3C1]">
              Order Confirmed এবং Payment Verified হওয়ার পরই Stock কমানো যাবে।
              এই কাজ একবারই করা যাবে।
            </p>
          </>
        )}
      </DetailCard>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#6D5DFB] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
        >
          <CheckCircle2 size={17} />
          {saving ? "Saving..." : "Save Order Updates"}
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;
