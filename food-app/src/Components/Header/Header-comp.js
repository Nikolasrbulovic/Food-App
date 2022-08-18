import styles from "./Header.module.css";
import React, { Fragment } from "react";
import mealsImg from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";

const Header1 = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React meals</h1>
        <HeaderCardButton onClick ={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="a table full of food"></img>
      </div>
      
    </Fragment>
  );
};
export default Header1;
