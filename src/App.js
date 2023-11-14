import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./views/HomeScreen";
import ProductScreen from "./views/productScreen";
import CategoriesScreen from "./views/CategoriesScreen";
import OrderScreen from "./views/OrderScreen";
import OrderDetailScreen from "./views/OrderDetailScreen";
import AddProduct from "./views/AddProduct";
import Login from "./views/LoginScreen";
import UsersScreen from "./views/UsersScreen";
import ProductEditScreen from "./views/ProductEditScreen";
import NotFound from "./views/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import { productListAllAction } from "./redux/actions/ProductAction";
import { orderListAllAction } from "./redux/actions/OrderAction";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/ChakraUI/theme";
import { Redirect } from "react-router";
import BrandScreen from "./views/BrandScreen";
function App() {
  // * Async all productList and orderList in App, If not => dispatch action will update state alot
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  useEffect(() => {
    if (userData && userData?.isAdmin) {
      dispatch(productListAllAction());
      dispatch(orderListAllAction());
    }
  }, [dispatch, userData]);

  //! Lưu ý: sắp xếp luồng chạy ưu tiên khi làm filter, pagination, sort....
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <PrivateRouter path="/" component={HomeScreen} exact />
            {/* <PrivateRouter
              path="/products/all/page/:pageNumber"
              component={ProductScreen}
            /> */}
            <PrivateRouter
              path="/products/all"
              component={ProductScreen}
              exact
            />
            {/* <PrivateRouter
              path="/search/:keyword/page/:pageNumber"
              component={ProductScreen}
              exact
            /> */}
            <PrivateRouter
              path="/products/search"
              component={ProductScreen}
              exact
            />
            <PrivateRouter
              path="/product/:id/edit"
              component={ProductEditScreen}
            />
            <PrivateRouter path="/brand" component={BrandScreen} />
            <PrivateRouter path="/category" component={CategoriesScreen} />
            <PrivateRouter path="/orders" component={OrderScreen} />
            <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
            <PrivateRouter path="/addproduct" component={AddProduct} />
            <PrivateRouter path="/users" component={UsersScreen} />

            {userData && userData?.isAdmin ? (
              <Redirect to="/" component={HomeScreen} exact />
            ) : (
              <Route path="/login" component={Login} />
            )}
            <PrivateRouter path="*" component={NotFound} />
          </Switch>
        </Router>
      </ChakraProvider>
    </>
  );
}
export default App;
