import { ProductProps } from "@/utils";
import { create } from "zustand";
import { addProduct } from "../helpers/cart-in-memory";

export type ProductCartProps = ProductProps & {
  quantity: number;
};

type StateProps = {
  products: ProductCartProps[];
  addProduct: (product: ProductProps) => void;
  //   removeProduct: (id: string) => void;
  //   clearCart: () => void;
};

export const useCartStore = create<StateProps>((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({
      products: addProduct(state.products, product),
    })),
}));
