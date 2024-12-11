import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './AdminPanel.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/product/asyncActions';
import { TitlesLine } from '../../components/TitlesLine';
import { ProductsList } from '../../components/ProductsList';
import { NewsList } from '../../components/NewsList';
import { fetchNews } from '../../redux/news/asyncActions';
import { fetchReviews } from '../../redux/review/asyncActions';
import { ReviewList } from '../../components/ReviewsList';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { getCookie } from '../../utils/getCookie';
import { setCookie } from '../../utils/setCookie';

const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];
const newsTitles = ['id', 'title', 'image', 'description', 'createdAt'];
const reviewTitles = ['id', 'newsId', 'userName', 'text'];

export const AdminPanel = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, status: productsStatus } = useSelector((state) => state.product);
  const { items: news, status: newsStatus } = useSelector((state) => state.news);
  const { items: reviews, status: reviewsStatus } = useSelector((state) => state.review);

  useEffect(() => {
    if (isAuth) {
      (async () => {
        await dispatch(fetchProducts());
        await dispatch(fetchNews());
        await dispatch(fetchReviews());
      })();
    } else {
      if ('admin' in getCookie()) setIsAuth(true);
    }
  }, [isAuth]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth`, data);

      setCookie('admin', '1', { secure: true, 'max-age': 300 });
      if (res.status === 200) setIsAuth(true);
    } catch (e) {
      console.log(e);
    }

    reset();
  };

  return (
    <>
      {isAuth ? (
        <div className={s.root}>
          <h1 className={s.mainTitle} onClick={() => navigate('/')}>
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
      ) : (
        <div className={s.auth}>
          <h1 className={s.title}>Admin panel</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span>login:</span>
              <Input name={'login'} register={register} />
            </div>
            <div>
              <span>password:</span>
              <Input name={'password'} register={register} />
            </div>
            <Button style={{ width: '100%', marginTop: '20px' }} styleType={'green'} type={'submit'} title={'Login'} />
          </form>
        </div>
      )}
    </>
  );
};
