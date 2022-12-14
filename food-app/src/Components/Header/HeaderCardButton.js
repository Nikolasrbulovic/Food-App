import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCardButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCardButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
     return;
    }
    setBtnIsHighlighted(true);
    const time = setTimeout(()=>{
      setBtnIsHighlighted(false)
    },300)
    return ()=>{
      clearTimeout(time)
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}> {numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
