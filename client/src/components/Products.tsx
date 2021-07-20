import { SingleProduct } from "./SingleProduct";
import { useProduct } from "../contexts/ProductContext";
import { Product } from "../models/Product";
import { Link } from "react-router-dom";
import { Paginate } from "./Paginate";

import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";

export const Products = () => {
  const { products, isLoading, addToCart, productsInCart } = useProduct();

  if (isLoading) {
    return <p>loading...</p>;
  }
  let totalBasketProducts = 0;
  const numberOfProductsInCart = (productsInCart: Product[]) => {
    productsInCart.reduce((acc: number, product) => {
      totalBasketProducts = acc + product.amount;
      return totalBasketProducts;
    }, 0);
  };
  numberOfProductsInCart(productsInCart);
  return (
    <div>
      <Link to='/cart'>
        Cart
        {totalBasketProducts}
      </Link>
      <Container>
        <Row xs={1} md={2} className='g-4'>
          {products.results.map((product: Product) => (
            <Col>
              <Card style={{ width: "18rem", maxHeight: "400px" }}>
                <SingleProduct
                  key={product.id}
                  product={product}
                  addToCart={() => {
                    addToCart(product);
                  }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Paginate />
    </div>
  );
};
