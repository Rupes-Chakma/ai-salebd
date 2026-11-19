import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, variant, quantity = 1) => {
        if (!product?.id) return;

        const productId = String(product.id);
        const variantId = String(variant?.id ?? variant?.name ?? "default");

        const requestedQuantity = Math.max(
          1,
          Math.min(99, Number(quantity) || 1),
        );

        const price = Number(variant?.price ?? product.price);

        if (!Number.isFinite(price) || price < 0) return;

        const existingItem = get().cartItems.find(
          (item) =>
            String(item.productId) === productId &&
            String(item.variantId) === variantId,
        );

        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.cartId === existingItem.cartId
                ? {
                    ...item,
                    quantity: Math.min(
                      99,
                      Number(item.quantity) + requestedQuantity,
                    ),
                  }
                : item,
            ),
          });

          return;
        }

        set({
          cartItems: [
            ...get().cartItems,
            {
              cartId: `${productId}-${variantId}`,
              productId,
              variantId,
              name: product.name,
              category: product.category,
              image: product.image,
              variantName: variant?.name || "Default",
              price,
              quantity: requestedQuantity,
            },
          ],
        });
      },

      removeFromCart: (cartId) =>
        set({
          cartItems: get().cartItems.filter((item) => item.cartId !== cartId),
        }),

      updateQuantity: (cartId, quantity) => {
        const safeQuantity = Math.max(1, Math.min(99, Number(quantity) || 1));

        set({
          cartItems: get().cartItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity: safeQuantity } : item,
          ),
        });
      },

      clearCart: () => set({ cartItems: [] }),

      getCartTotal: () =>
        get().cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0,
        ),

      getCartCount: () =>
        get().cartItems.reduce(
          (total, item) => total + Number(item.quantity),
          0,
        ),
    }),
    {
      name: "nexora-cart",
    },
  ),
);

export default useCartStore;
