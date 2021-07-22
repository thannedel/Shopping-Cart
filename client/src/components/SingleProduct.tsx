import { Button, Card } from "react-bootstrap";
import { Product } from "../models/Product";

interface ProductProps {
  product: Product;
  addToCart: (clickedProduct: Product) => void;
}

export const SingleProduct = ({ product, addToCart }: ProductProps) => {
  return (
    <>
      <Card.Img variant='top' src={product.image} />
      <Card.Body>
        <Card.Text>{product.title}</Card.Text>
        <Card.Text>{product.price} €</Card.Text>
        <Button
          variant='primary'
          onClick={() => {
            addToCart(product);
          }}
        >
          Add To Cart
        </Button>{" "}
      </Card.Body>
    </>
  );
};
