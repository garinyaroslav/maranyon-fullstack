import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './AdminPanel.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/product/asyncActions';
import { TitlesLine } from '../../components/TitlesLine';
import { ProductsList } from '../../components/ProductsList';
import { NewsList } from '../../components/NewsList';
import { fetchNews } from '../../redux/news/asyncActions';
import { fetchReviews } from '../../redux/review/asyncActions';
import { ReviewList } from '../../components/ReviewsList';

const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];
const newsTitles = ['id', 'title', 'image', 'description', 'createdAt'];
const reviewTitles = ['id', 'newsId', 'userName', 'text'];

export const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, status: productsStatus } = useSelector((state) => state.product);
  const { items: news, status: newsStatus } = useSelector((state) => state.news);
  const { items: reviews, status: reviewsStatus } = useSelector((state) => state.review);

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchNews());
      await dispatch(fetchReviews());
    })();
  }, []);

  return (
    <div className={s.root}>
      <h1 className={s.mainTitle} onClick={() => navigate('/app')}>
        ⬅ Admin panel
      </h1>
      <h3 className={s.subTitle}>Products</h3>
      <TitlesLine titles={productTitles} />
      {productsStatus === 'success' && <ProductsList elems={products} />}
      <h3 className={s.subTitle}>News</h3>
      <TitlesLine titles={newsTitles} />
      {newsStatus === 'success' && <NewsList elems={news} />}
      <h3 className={s.subTitle}>Reviews</h3>
      <TitlesLine titles={reviewTitles} />
      {reviewsStatus === 'success' && <ReviewList elems={reviews} />}
    </div>
  );
};
