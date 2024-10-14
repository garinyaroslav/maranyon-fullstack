import { useDispatch, useSelector } from 'react-redux';

import { removeItem, plusItem, minusItem } from '../../redux/cart/slice';

import styles from './CartItem.module.scss';

export const CartItem = ({ id, imgUrl, title, price }) => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const item = items.find((item) => item.id === id);

  return (
    <div className={styles.root}>
      <img src={imgUrl} alt="cartItemImg" />
      <div className={styles.info}>
        <div className={styles.title}>
          <span>{title}</span>
          <img
            onClick={() => dispatch(removeItem(id))}
            className={styles.closeImg}
            src="/img/close.svg"
            alt="close"
          />
        </div>
        <span className={styles.price}>{price}₽</span>
        <div className={styles.quantity}>
          <div onClick={() => dispatch(minusItem(id))} className={styles.minus}>
            -
          </div>
          <div className={styles.count}>{item.count}</div>
          <div onClick={() => dispatch(plusItem(id))} className={styles.plus}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};
