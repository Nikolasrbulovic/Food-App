
  import { initializeApp } from 'firebase/app';
import Header1 from "./Components/Header/Header-comp.js";
import React, { useState } from "react";
import Meals from "./Components/Meals/Meals.js";
import Cart from "./Components/Cart/Cart.js";
import CartProvider from "./store/CartProvider.js";
import Checkout from './Components/Cart/Checkout.js';
import { getDatabase, ref, set } from "firebase/database";
const App = () => {

  const firebaseConfig = {
    databaseURL: "https://food-app-f8fd1-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: 'food-app-f8fd1'
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const [cartIsShown, setCartIsShown] = useState(false)
  const [checkoutIsShown, setCheckoutIsShown] = useState(false)
  const showCheckoutHandler =() =>{
    setCheckoutIsShown(true)
   
  }
  const hideCheckoutHandler = () =>{
    setCheckoutIsShown(false)
  }

  const showCartHandler = () =>{
    setCartIsShown(true);
  }
  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  const orderSubmitHandler = (orders, userInfo) => {
    const db = getDatabase();
    set(ref(db, 'orders/'), {
     user : userInfo,
     orderedItems : orders
    });
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose = {hideCartHandler} showCheckout={showCheckoutHandler} />}
      {checkoutIsShown && <Checkout onClose={hideCheckoutHandler} onSubmit={orderSubmitHandler} />}
      <Header1 onShowCart = {showCartHandler} />
      <main>
         <Meals />
      </main>
    </CartProvider>
   
  );
};
export default App;
