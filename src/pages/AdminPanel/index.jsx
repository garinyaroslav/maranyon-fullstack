import { useEffect } from 'react';
import s from './AdminPanel.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/product/asyncActions';
import { TitlesLine } from '../../components/TitlesLine';
import { ProductsList } from '../../components/ProductsList';
import { NewsList } from '../../components/NewsList';
import { fetchNews } from '../../redux/news/asyncActions';

const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];
const newsTitles = ['id', 'title', 'image', 'description', 'createdAt'];

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const { items: products, status: productsStatus } = useSelector((state) => state.product);
  const { items: news, status: newsStatus } = useSelector((state) => state.news);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchNews());
    })();
  }, []);

  return (
    <div className={s.root}>
      <h1 className={s.mainTitle}>Admin panel</h1>
      <h3 className={s.subTitle}>Products</h3>
      <TitlesLine titles={productTitles} />
      {productsStatus === 'success' && <ProductsList elems={products} />}
      <h3 className={s.subTitle}>News</h3>
      <TitlesLine titles={newsTitles} />
      {newsStatus === 'success' && <NewsList elems={news} />}
    </div>
  );
};
