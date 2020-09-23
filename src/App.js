import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Offers from "./pages/Offers";
import List from "./pages/List";
import NotFound from "./pages/NotFound";
import Thanks from "./pages/Thanks";
import Extra from "./pages/Extra";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackOrder from "./pages/TrackOrder";
import Invoice from "./pages/Invoice";
import Checkout from "./pages/Checkout";
import Detail from "./pages/Detail";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-select2-wrapper/css/select2.css";
import "./App.css";
import AboutUs from "./pages/AboutUs";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PrivateRoute from "./routes/PrivateRoute";
import FoodNBeverage from "./pages/FoodNBeverage";
import Services from "./pages/Services";
import FoodSponsers from "./pages/FoodSponsers";
import { connect } from "react-redux";
import ServiceDetail from "./pages/ServiceDetail";

//use it later
import env from "dotenv";
import cors from "cors";

const App = (user) => {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/offers" component={Offers} />
        <Route path="/listing" component={List} />
        <Route path="/extra" component={Extra} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/track-order" component={TrackOrder} />
        <Route path="/invoice" component={Invoice} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/thanks" component={Thanks} />
        <Route path="/restaurant/:slug" component={Detail} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/food-and-beverage" component={FoodNBeverage} />
        <Route path="/services" component={Services} />
        <Route path="/food-sponsers" component={FoodSponsers} />
        <PrivateRoute path="/myaccount" component={ProtectedRoutes} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(App);
