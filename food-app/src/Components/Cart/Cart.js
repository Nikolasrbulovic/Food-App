import styles from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import { useContext } from 'react';


const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
  
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    };
  
    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item)
    };
  
    const cartItems = (
      <ul className={styles['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, {...item, amount: 1})}
          />
        ))}
      </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={styles.button} onClick={() =>{props.onClose(); props.showCheckout()}}>Order</button>}
            </div>
        </Modal>
    );
}
export default Cart