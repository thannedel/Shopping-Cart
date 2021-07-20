import { PropsWithChildren, useState, useEffect } from "react";
import { createCtx, useLocalStorage } from "../hooks";

import { Product } from "../models/Product";

const [useProduct, ProductCtxProvider] = createCtx<any>();

const ProductProvider = (props: PropsWithChildren<any>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState([] as Product[]);
  const [productsInCart, setProductsInCart] = useLocalStorage("product");

  const [currentPage, setCurrentPage] = useState(1);
  //const [productsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts = async (): Promise<Product[]> => {
      const response = await fetch(`/products/?page=${currentPage}&limit=10`);
      const data = await response.json();
      console.log(data);
      setProducts(data);
      setIsLoading(false);
      return data;
    };
    fetchProducts();
  }, [currentPage]);
  const addToCart = (clickedItem: Product) => {
    setProductsInCart((prevState: Product[]) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prevState.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prevState.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prevState, { ...clickedItem, amount: 1 }];
    });
  };

  const removeProductFromCart = (id: number) => {
    setProductsInCart((prevState: Product[]) =>
      prevState.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as Product[])
    );
  };

  useEffect(() => {
    localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  return (
    <ProductCtxProvider
      value={{
        products,
        isLoading,
        setProductsInCart,
        productsInCart,
        addToCart,
        removeProductFromCart,
        currentPage,
        //productsPerPage,
        setCurrentPage,
      }}
    >
      {props.children}
    </ProductCtxProvider>
  );
};
export { useProduct, ProductProvider };
