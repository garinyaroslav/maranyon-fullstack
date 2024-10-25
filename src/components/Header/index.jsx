import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { PhoneMenu } from '../PhoneMenu';
import { setIsOpen } from '../../redux/cart/slice';

import styles from './Header.module.scss';

export const Header = () => {
  const [menu, setMenu] = React.useState(false);
  const dispatch = useDispatch();

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link to="/app">
          <img className={styles.logo} src="/img/maranyon-logo.png" alt="logo" />
        </Link>
        <ul className={styles.buttons}>
          <Link to="news">
            <li>Новости</li>
          </Link>
          <Link to="categories">
            <li>Каталог</li>
          </Link>
          <li onClick={() => dispatch(setIsOpen())}>Корзина</li>
        </ul>
        <img onClick={() => setMenu(true)} className={styles.menu} src="/img/menu.svg" alt="menu" />
      </div>
      <PhoneMenu menu={menu} setMenu={setMenu} />
    </header>
  );
};
