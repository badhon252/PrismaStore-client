import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";
// eslint-disable-next-line import/no-unresolved
import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          // Item already exists, update the quantity
          const updatedItems = currentItems.map((item) =>
            item.id === data.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
          set({ items: updatedItems });
          toast.success("Item quantity updated in cart.");
        } else {
          // Item does not exist, add it to the cart
          set({ items: [...currentItems, { ...data, quantity: 1 }] });
          toast.success("Item added to cart.");
        }
      },

      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast.success("Item removed from cart.");
      },

      removeAll: () => set({ items: [] }),

      updateQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const updatedItems = currentItems.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        );

        // Calculate the difference in quantity
        // const currentItem = currentItems.find((item) => item.id === id);
        // const diffQuantity = quantity - (currentItem?.quantity || 0);

        // Update the total stock of the product
        // Assuming you have access to a function that updates the total stock
        // updateTotalStock(id, diffQuantity);

        set({ items: updatedItems });
        toast.success("Item quantity updated in cart.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;

// Function to update the total stock of the product
// const updateTotalStock = (productId: string, diffQuantity: number) => {
//   // TODO:
//   // Implement logic to update the total stock based on productId and diffQuantity
//   // This could involve making a network request to update the server's stock data
//   // or updating a local state representing the total stock
//   // console.log(`Product ${productId} stock updated by ${diffQuantity}`);
// };
