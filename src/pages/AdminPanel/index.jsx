import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios.ts';
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
import { setCookie } from '../../utils/setCookie';

const productTitles = ['ИД', 'Название', 'Картинки', 'Описание', 'Категория', 'Цена', 'Цвет', 'Вес', 'Размер'];
const newsTitles = ['ИД', 'Название', 'Картинка', 'Описание', 'Дата создания'];
const reviewTitles = ['ИД', 'ИД новости', 'Имя пользователя', 'Текст'];

export const AdminPanel = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, status: productsStatus } = useSelector((state) => state.product);
  const { items: news, status: newsStatus } = useSelector((state) => state.news);
  const { items: reviews, status: reviewsStatus } = useSelector((state) => state.review);

  const fetchAll = async () => {
    await dispatch(fetchProducts());
    await dispatch(fetchNews());
    await dispatch(fetchReviews());
  };

  const verify = async () => {
    let res;
    try {
      res = await axios.post(`/auth/verify`);
    } catch {
      res = { status: 403 };
    }

    return res.status;
  };

  useEffect(() => {
    if (isAuth) {
      fetchAll();
    } else {
      verify().then((status) => (status === 200 ? setIsAuth(true) : () => {}));
    }
  }, [isAuth]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/auth`, data);

      setCookie('token', res.data.token, { secure: true, 'max-age': 300 });
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
            ⬅ Админ-панель
          </h1>
          <h3 className={s.subTitle}>Товары</h3>
          <TitlesLine titles={productTitles} />
          {productsStatus === 'success' && <ProductsList elems={products} />}
          <h3 className={s.subTitle}>Новости</h3>
          <TitlesLine titles={newsTitles} />
          {newsStatus === 'success' && <NewsList elems={news} />}
          <h3 className={s.subTitle}>Отзывы</h3>
          <TitlesLine titles={reviewTitles} />
          {reviewsStatus === 'success' && <ReviewList elems={reviews} />}
        </div>
      ) : (
        <div className={s.auth}>
          <h1 className={s.title}>Админ-панель</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span>Логин:</span>
              <Input name={'login'} register={register} />
            </div>
            <div>
              <span>Пароль:</span>
              <Input type={'password'} name={'password'} register={register} />
            </div>
            <Button style={{ width: '100%', marginTop: '20px' }} styleType={'green'} type={'submit'} title={'Войти'} />
          </form>
        </div>
      )}
    </>
  );
};
