import { create } from "zustand";
import { persist } from "zustand/middleware";

import initialProducts from "../data/products";

const defaultProducts = initialProducts.map((product, index) => ({
  ...product,
  id: product.id || index + 1,
  status: product.status || "Active",
}));

const useProductStore = create(
  persist(
    (set) => ({
      products: defaultProducts,

      addProduct: (product) =>
        set((state) => ({
          products: [
            {
              ...product,
              id: Date.now(),
              status: product.status || "Active",
            },
            ...state.products,
          ],
        })),

      updateProduct: (id, updatedData) =>
        set((state) => ({
          products: state.products.map((product) =>
            String(product.id) === String(id)
              ? { ...product, ...updatedData }
              : product,
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter(
            (product) => String(product.id) !== String(id),
          ),
        })),

      toggleProductStatus: (id) =>
        set((state) => ({
          products: state.products.map((product) =>
            String(product.id) === String(id)
              ? {
                  ...product,
                  status: product.status === "Active" ? "Inactive" : "Active",
                }
              : product,
          ),
        })),
    }),
    {
      // Existing LocalStorage key unchanged
      name: "nexora-products",

      // Preserve an intentionally empty product array
      merge: (persistedState, currentState) => {
        const savedProducts = persistedState?.products;

        return {
          ...currentState,
          ...persistedState,
          products: Array.isArray(savedProducts)
            ? savedProducts
            : currentState.products,
        };
      },
    },
  ),
);

export default useProductStore;
