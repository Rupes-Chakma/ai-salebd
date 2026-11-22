import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_QUANTITY = 99;

const safeQuantity = (value) => {
  const quantity = Number(value);

  if (!Number.isFinite(quantity)) return 1;

  return Math.max(1, Math.min(MAX_QUANTITY, Math.floor(quantity)));
};

const safePrice = (value) => {
  const price = Number(value);

  return Number.isFinite(price) && price >= 0 ? price : 0;
};

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      // Add Product to Cart
      addToCart: (product, variant, quantity = 1) => {
        if (!product?.id) return;

        const productId = String(product.id);
        const variantId = String(variant?.id ?? variant?.name ?? "default");

        const requestedQuantity = safeQuantity(quantity);
        const price = safePrice(variant?.price ?? product.price);

        const existingItem = get().cartItems.find(
          (item) =>
            String(item.productId) === productId &&
            String(item.variantId) === variantId,
        );

        if (existingItem) {
          set((state) => ({
            cartItems: state.cartItems.map((item) =>
              item.cartId === existingItem.cartId
                ? {
                    ...item,
                    quantity: Math.min(
                      MAX_QUANTITY,
                      safeQuantity(item.quantity) + requestedQuantity,
                    ),
                  }
                : item,
            ),
          }));

          return;
        }

        set((state) => ({
          cartItems: [
            ...state.cartItems,
            {
              cartId: `${productId}-${variantId}`,
              productId,
              variantId,
              name: product.name || "Product",
              category: product.category || "",
              image: product.image || "",
              variantName: variant?.name || "Default",
              price,
              quantity: requestedQuantity,
            },
          ],
        }));
      },

      // Remove Product
      removeFromCart: (cartId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.cartId !== cartId),
        }));
      },

      // Update Quantity
      updateQuantity: (cartId, quantity) => {
        const safeValue = safeQuantity(quantity);

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity: safeValue } : item,
          ),
        }));
      },

      // Clear Cart
      clearCart: () => set({ cartItems: [] }),

      // Cart Total
      getCartTotal: () =>
        get().cartItems.reduce(
          (total, item) =>
            total + safePrice(item.price) * safeQuantity(item.quantity),
          0,
        ),

      // Total Cart Quantity
      getCartCount: () =>
        get().cartItems.reduce(
          (total, item) => total + safeQuantity(item.quantity),
          0,
        ),
    }),
    {
      name: "nexora-cart",
      version: 1,

      // Validate persisted Cart Data
      merge: (persistedState, currentState) => {
        const savedItems = Array.isArray(persistedState?.cartItems)
          ? persistedState.cartItems
          : [];

        return {
          ...currentState,
          ...persistedState,
          cartItems: savedItems
            .filter((item) => item?.productId && item?.cartId)
            .map((item) => ({
              ...item,
              price: safePrice(item.price),
              quantity: safeQuantity(item.quantity),
            })),
        };
      },
    },
  ),
);

export default useCartStore;
