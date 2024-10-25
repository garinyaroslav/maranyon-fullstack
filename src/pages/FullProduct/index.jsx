import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { addItem } from '../../redux/cart/slice';
import { itemCountAdd, itemCountPut } from '../../redux/product/slice';
import { fetchProducts, fetchProduct } from '../../redux/product/asyncActions';
import { scrollUp } from '../../utils/scrollUp';
import { Slick } from '../../components';

import styles from './FullProduct.module.scss';

export const FullProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showPopup, setShowPopup] = React.useState(false);
  const [image, setImage] = React.useState(0);
  const { status, item, itemStatus, itemCount } = useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);

  React.useEffect(() => {
    scrollUp();
    if (status === 'loading') {
      dispatch(fetchProducts());
    }
  }, []);

  const addToCart = () => {
    dispatch(addItem({ item, itemCount }));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
  };

  return (
    <div className={styles.root}>
      <CSSTransition in={showPopup} timeout={500} classNames="alert" unmountOnExit>
        <div className={styles.popup}>Товар добавлен в корзину✅</div>
      </CSSTransition>
      <div className={styles.productBlock}>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.imgSide}>
          <div className={styles.imgContainer}>
            <img src={itemStatus === 'success' ? item.imageUrls[image] : ''} alt="productphoto" />
          </div>
          <div className={styles.selector}>
            <img
              onMouseOver={() => setImage(0)}
              src={itemStatus === 'success' ? item.imageUrls[0] : ''}
              alt="porductminiphoto"
            />
            <img
              onMouseOver={() => setImage(1)}
              src={itemStatus === 'success' ? item.imageUrls[1] : ''}
              alt="porductminiphoto"
            />
            <img
              onMouseOver={() => setImage(2)}
              src={itemStatus === 'success' ? item.imageUrls[2] : ''}
              alt="porductminiphoto"
            />
          </div>
        </div>
        <div className={styles.textSide}>
          <p>{item.description}</p>
          <div className={styles.price}>
            <span>Колличество</span>
            <div className={styles.quantity}>
              <div onClick={() => dispatch(itemCountPut())} className={styles.plus}>
                -
              </div>
              <div className={styles.count}>{itemCount}</div>
              <div onClick={() => dispatch(itemCountAdd())} className={styles.minus}>
                +
              </div>
            </div>
            <span>{item.price * itemCount}₽</span>
          </div>
          <div className={styles.buttons}>
            <div onClick={addToCart} className={styles.cart}>
              В корзину
            </div>
            <div className={styles.bay}>Купить сейчас</div>
          </div>
        </div>
      </div>
      <div className={styles.about}>
        <div>
          <h3>Цвет:</h3>
          <p>{item.color}</p>
        </div>
        <div>
          <h3>Вес:</h3>
          <p>{item.weight} кг</p>
        </div>
        <div>
          <h3>Размеры:</h3>
          <p>{item.size} см</p>
        </div>
      </div>
      <Slick />
    </div>
  );
};
