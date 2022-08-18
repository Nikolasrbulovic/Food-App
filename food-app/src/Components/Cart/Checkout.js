import Modal from "../UI/Modal";
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
const Checkout = (props) => {
  const cartCtx = useContext(CartContext); 
  const {
    reset: resetNameInput,
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurhandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    reset: resetStreetInput,
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurhandler: streetBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    reset: resetPostalInput,
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: postalInputHasError,
    valueChangeHandler: postalChangeHandler,
    inputBlurhandler: postalBlurHandler,
  } = useInput((value) => value.trim() !== "");
  const {
    reset: resetCityInput,
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurhandler: cityBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const nameInputClasses = !nameInputHasError
    ? `${classes.control}`
    : `${classes.invalid}`;
    const streetInputClasses = !streetInputHasError
    ? `${classes.control}`
    : `${classes.invalid}`;
    const postalInputClasses = !postalInputHasError
    ? `${classes.control}`
    : `${classes.invalid}`;
    const cityInputClasses = !cityInputHasError
    ? `${classes.control}`
    : `${classes.invalid}`;

  

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredStreetIsValid && !enteredPostalIsValid && !enteredCityIsValid) {
      return;
    }
    const userInfo = {
      name: enteredName,
      street: enteredStreet,
      postal : enteredPostal,
      city: enteredCity
    };


    props.onSubmit(cartCtx.items, userInfo)
    resetNameInput();
    resetStreetInput();
    resetPostalInput();
    resetCityInput();
  };

  return (
    <Modal onClose={props.onClose}>
      <form className={classes.form} onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onBlur={nameBlurHandler}
            onChange={nameChangeHandler}
            value={enteredName}
          />
          
        </div>
        <div className={streetInputClasses}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street"
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
          value={enteredStreet} />
        </div>
        <div className={postalInputClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" 
           onBlur={postalBlurHandler}
           onChange={postalChangeHandler}
           value={enteredPostal}
          />
        </div>
        <div className={ cityInputClasses}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" 
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
          value={enteredCity}/>
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onClose}>
            Cancel
          </button>
          <button className={classes.submit} >Confirm</button>
        </div>
      </form>
    </Modal>
  );
};

export default Checkout;
