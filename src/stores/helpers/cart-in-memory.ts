import { ProductProps } from "@/utils";
import { ProductCartProps } from "../CartStore";

export const addProduct = (
  product: ProductCartProps[],
  newProduct: ProductProps
) => {
  const existingProduct = product.find((item) => item.id === newProduct.id);

  if (existingProduct) {
    return product.map((product) =>
      product.id === existingProduct.id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );
  }

  return [
    ...product,
    {
      ...newProduct,
      quantity: 1,
    },
  ];
};

export const remove = (products: ProductCartProps[], id: string) => {
  const updatedProducts = products.map((product) =>
    product.id === id
      ? {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 0,
        }
      : product
  );

  return updatedProducts.filter((product) => product.quantity > 0);
};
