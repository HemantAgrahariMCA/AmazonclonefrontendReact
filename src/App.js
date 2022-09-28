import { useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Product from "./component/Product/Product.js";
import Home from "./component/Home/Home.js";
import Search from "./component/Product/Search.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import WebFont from "webfontloader";
import React from "react";
import LoginSignup from "./component/User/LoginSignup.js";
import store from "./Store";
import { loadUser } from "./actions/userAction.js";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import myOrders from "./component/Order/myOrders.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import NewProduct from "./component/admin/newProduct.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  const { isAuthenticate, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticate && <UserOptions user={user} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Product} />
      <Route exact path="/products/:keyword" component={Product} />
      <Route exact path="/Search" component={Search} />
      <Route exact path="/login" component={LoginSignup} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />
      <Route exact path="/password/Forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />

      <ProtectedRoute exact path="/success" component={OrderSuccess} />
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}
      <ProtectedRoute exact path="/orders" component={myOrders} />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products"
        component={ProductList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product/:id"
        component={UpdateProduct}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/orders"
        component={OrderList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/orders/:id"
        component={ProcessOrder}
      />
      <ProtectedRoute
        exact
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
      />
      <ProtectedRoute
        exact
        path="/admin/user/:id"
        isAdmin={true}
        component={UpdateUser}
      />
      <ProtectedRoute
        exact
        path="/admin/reviews"
        isAdmin={true}
        component={ProductReviews}
      />

      <ProtectedRoute
        exact
        path="/admin/product"
        isAdmin={true}
        component={NewProduct}
      />

      {/* <Switch> */}
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      {/* </Switch> */}

      <Footer />
    </Router>
  );
}

export default App;
