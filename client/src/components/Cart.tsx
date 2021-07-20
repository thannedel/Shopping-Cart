import { useProduct } from "../contexts/ProductContext";
import { Product } from "../models/Product";

const Cart = () => {
  const { productsInCart, removeProductFromCart } = useProduct();
  console.log(productsInCart);

  return (
    <div>
      {productsInCart.map((product: Product, index: string) => {
        return (
          <div key={index}>
            <p>{product.title}</p>
            <p>{product.amount}</p>
            <button
              onClick={() => {
                removeProductFromCart(product.id);
              }}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Cart;
