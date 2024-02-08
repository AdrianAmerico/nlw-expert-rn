import { ProductProps } from "@/utils";
import { create } from "zustand";
import * as cartInMemory from "../helpers/cart-in-memory";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  addProduct: (product: ProductProps) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create(
  persist<StateProps>(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: cartInMemory.addProduct(state.products, product),
        })),
      remove: (id) =>
        set((state) => ({
          products: cartInMemory.remove(state.products, id),
        })),
      clear: () => set(() => ({ products: [] })),
    }),
    {
      name: "nlw-expert:cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
