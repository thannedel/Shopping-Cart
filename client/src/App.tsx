import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Products } from "./components/Products";
import Cart from "./components/Cart";
import { ProductProvider } from "../src/contexts/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <Router>
      <ProductProvider>
        <>
          <Switch>
            <Route exact path='/'>
              <Products />
            </Route>
            <Route path='/cart'>
              <Cart />
            </Route>
          </Switch>
        </>
      </ProductProvider>
    </Router>
  );
};

export default App;
