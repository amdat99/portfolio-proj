import React, { Suspense } from "react";

import "./App.css";
import "./app.scss"

import { Switch, Route, Redirect } from "react-router-dom";
import Modal from "./modal/Modal";
import LandingPage from "./pages/landing-page/Landing-page";
import SignOn from "./pages/signon-page/Signon";
import Profile from "./pages/profile/Profile";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { connect } from "react-redux";
import { selectToggledModal } from "./redux/modal/modal.selectors";

import NavigationShared from "./components/navigation-shared/Navigation-shared";
import ProductFilterPage from "./pages/product-filter-page/Product-filter-page";

const StorePage = React.lazy(() => import("./pages/store-page/Store-page"));
const ListItem = React.lazy(() => import("./pages/list-item/List-item"));
const CheckoutPage = React.lazy(() =>
  import("./pages/checkout-page/Checkout-page")
);
const CategoryPage = React.lazy(() => import("./pages/category/Category-page"));
const ProductPage = React.lazy(() =>
  import("./pages/product-page/Product-page")
);

const ChatPage = React.lazy(() => import("./pages/chat-page/Chat-page"));

function App({ currentUser, selectToggledModal }) {
  return (
    <div className="App dark">
      <NavigationShared />
      {selectToggledModal ? (
        <Modal>
          <Profile />
        </Modal>
      ) : null}

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/signon"
          render={() => (currentUser ? <Redirect to="/" /> : <SignOn />)}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <Route exact path="/store" component={StorePage} />
          <Route path="/listitems" component={ListItem} />
          <Route exact path="/products" component={ProductFilterPage} />
          <Route path="/category" component={CategoryPage} />
          <Route path="/product" component={ProductPage} />
          <Route path="/checkout" component={CheckoutPage} />

          <Route path="/chatapp" component={ChatPage} />
        </Suspense>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectToggledModal: selectToggledModal,
});

export default connect(mapStateToProps)(App);
