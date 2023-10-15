import { create } from "zustand";

interface TotalStockStore {
  totalStock: Record<string, number>;
  updateTotalStock: (productId: string, diffQuantity: number) => void;
}

export const useTotalStock = create<TotalStockStore>((set) => ({
  totalStock: {},
  updateTotalStock: (productId, diffQuantity) => {
    set((state) => ({
      totalStock: {
        ...state.totalStock,
        [productId]: (state.totalStock[productId] || 0) + diffQuantity,
      },
    }));
  },
}));
