import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/product/asyncActions';

import { Skeleton } from '../../components/ProductBlock/Skeleton';
import { Windows, ProductBlock, Slick } from '../../components';
import { scrollUp } from '../../utils/scrollUp';

import styles from './Home.module.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.product);

  React.useEffect(() => {
    scrollUp();
    dispatch(fetchProducts());
  }, []);

  const products = Object.assign([], items).splice(0, 8);

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
  const prodItems = products.map((obj, i) => (
    <ProductBlock
      key={i}
      id={obj.id}
      image={obj.imageUrls[0]}
      title={obj.title}
      price={obj.price}
    />
  ));

  return (
    <div className={styles.root}>
      <Windows />
      <div className={styles.proud}>
        <h2>Продукция, которой мы гордимся</h2>
        <div className={styles.gridContainer}>{status !== 'success' ? skeletons : prodItems}</div>
      </div>
      <div className={styles.banner}>
        <div className={styles.textSide}>
          <h2>Творческая и гармоничная жизнь</h2>
          <p>
            Вся продукция Maranyon изготавливается по стандартным размерам, поэтому вы можете
            свободно комбинировать их.
          </p>
          <Link to="categories">
            <button onClick={scrollUp}>Начать покупки</button>
          </Link>
        </div>
        <div className={styles.imageSide}>
          <img src="/img/bannerImage1.webp" alt="banner" />
        </div>
      </div>
      <div className={styles.slyder}>
        <Slick />
      </div>
      <div className={styles.bannerRight}>
        <div className={styles.imageSide}>
          <img src="/img/bannerImage2.webp" alt="banner" />
        </div>
        <div className={styles.textSide}>
          <h2>Комфортная и элегантная жизнь</h2>
          <p>
            Вся продукция Maranyon изготавливается по стандартным размерам, поэтому вы можете
            свободно комбинировать их.
          </p>
          <Link to="categories">
            <button onClick={scrollUp}>Начать покупки</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
