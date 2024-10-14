import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProdByCategory } from '../../redux/category/asyncActions';
import { setProductName } from '../../redux/category/slice';

import { Skeleton } from '../../components/ProductBlock/Skeleton';
import { ProductBlock } from '../../components';
import { scrollUp } from '../../utils/scrollUp';

import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';

const categories = ['all', 'furnitures', 'lamps', 'electronics', 'kitchen', 'chairs', 'mirrors'];
const categoryNames = ['Все', 'Мебель', 'Люстры', 'Электроника', 'Кухня', 'Стулья', 'Зеркала'];

export const Categories = () => {
  const dispatch = useDispatch();
  const { products, status, categoryName } = useSelector((state) => state.categories);

  React.useEffect(() => {
    scrollUp();
    dispatch(fetchProdByCategory());
  }, []);

  const onChangeCategory = (name) => {
    scrollUp();

    if (name === 'Все') {
      dispatch(fetchProdByCategory());
      dispatch(setProductName('Все'));
    }
    dispatch(fetchProdByCategory(categories[categoryNames.indexOf(name)]));
    dispatch(setProductName(name));
  };

  const skeletons = [...new Array(8)].map((_, i) => <Skeleton key={i} />);
  const prodItems = products.map((obj, i) => (
    <ProductBlock
      key={i}
      id={obj.id}
      title={obj.title}
      image={obj.imageUrls[0]}
      price={obj.price}
    />
  ));

  return (
    <div className={styles.root}>
      <div className={styles.categories}>
        <h2>{categoryName}</h2>
        <div className={styles.tags}>
          {categoryNames.map((name, i) => (
            <span key={i} onClick={() => onChangeCategory(name)}>
              {name}
            </span>
          ))}
        </div>
        <div className={styles.products}>{status !== 'success' ? skeletons : prodItems}</div>
      </div>
    </div>
  );
};
