import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setIsOpen } from '../../redux/cart/slice';

import styles from './PhoneMenu.module.scss';

export const PhoneMenu = ({ menu, setMenu }) => {
  const dispatch = useDispatch();

  const onClickCart = () => {
    setMenu(false);
    dispatch(setIsOpen(true));
  };

  return (
    <div className={`${styles.root} ${menu ? styles.visible : ''}`}>
      <img onClick={() => setMenu(false)} src="/img/close.svg" alt="close" />
      <div className={styles.menu}>
        <Link to="/categories">
          <span onClick={() => setMenu(false)} className={styles.paragraph}>
            Каталог
          </span>
        </Link>
        <Link to="/categories">
          <span onClick={() => setMenu(false)} className={styles.paragraph}>
            Лампы
          </span>
        </Link>
        <span onClick={onClickCart} className={styles.paragraph}>
          Корзина
        </span>
      </div>
    </div>
  );
};
