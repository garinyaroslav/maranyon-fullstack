import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { countPrice, setIsOpen, setItems } from '../../redux/cart/slice';
import { CartItem } from '../CartItem';

import styles from './Drawer.module.scss';

export const Drawer = () => {
  const dispatch = useDispatch();
  const { isOpen, items, totalPrice } = useSelector((state) => state.cart);

  React.useEffect(() => {
    dispatch(setItems(JSON.parse(localStorage.getItem('items'))));
  }, []);

  React.useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    dispatch(countPrice());
  }, [items]);

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}>
      <div onClick={() => dispatch(setIsOpen())} className={styles.clickArea}></div>
      <div className={styles.drawer}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>Ваша корзина</span>
            <img
              onClick={() => dispatch(setIsOpen())}
              className={styles.closeImg}
              src="/img/close.svg"
              alt="close"
            />
          </div>
          {totalPrice !== 0 ? (
            <>
              <div className={styles.items}>
                {items.map((obj) => (
                  <CartItem
                    key={obj.id}
                    id={obj.id}
                    imgUrl={obj.imageUrls[0]}
                    title={obj.title}
                    price={obj.price}
                  />
                ))}
              </div>
              <div className={styles.totalCoast}>
                <div className={styles.info}>
                  <p>Всего к оплате:</p>
                  <span>{totalPrice}₽</span>
                </div>
                <div className={styles.subBut}>Оплатить</div>
              </div>
            </>
          ) : (
            <img className={styles.cartImg} src="/img/cartEmpty.webp" alt="cartempty" />
          )}
        </div>
      </div>
    </div>
  );
};
