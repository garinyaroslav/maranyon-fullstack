import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewsItem } from '../../components/NewsItem';
import { fetchNews } from '../../redux/news/asyncActions';

import s from './News.module.scss';

export const News = () => {
  const dispatch = useDispatch();
  const { items: news, status } = useSelector((state) => state.news);

  useEffect(() => {
    (async () => {
      await dispatch(fetchNews());
    })();
  }, []);

  const renderNews = () => {
    if (status === 'success') return news.map((obj, i) => <NewsItem key={i} newsObj={obj} />);
  };

  return (
    <div className={s.root}>
      <div className={s.news}>
        <h2>Новости</h2>
        <div className={s.newsBody}>{renderNews()}</div>
      </div>
    </div>
  );
};
