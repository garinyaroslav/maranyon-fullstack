import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NewsItem } from '../../components/NewsItem';
import { fetchNews } from '../../redux/news/asyncActions';

import s from './News.module.scss';

const tmp = [
  {
    id: 1,
    title: 'Новый продукт',
    image:
      'https://cdn.leroymerlin.ru/lmru/image/upload/v1685436473/b_white,c_pad,d_photoiscoming.png,f_auto,h_2000,q_auto,w_2000/lmcode/6NRtfqqQJUerv_qXbg-QXw/83656926_01.png',
    description:
      'alsdjf;l jssadlfj sa;llslkdafjlskda;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj slslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj sa;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj sslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj sa;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj sa;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdsadlfj sa;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjdadlfj sa;lslkdafjlskdajflkdsajlf saldfj lksadjflk jsaldfj ladsjfl lsafdjasd jfsjd;lf jldsaf;l dsajdfj;las;djf;l asjdf;lsajd;lf jsaldjflsajdflsa jdlfjsaldjfsaldjflasdjfl jsadlfjas;l djfasldfj;lsadjf ;lsadfjsal djflsdjflsa djlfdsjalf jsda;lfj dlsj',
    createdAt: '10.01.2004',
  },
  {
    id: 2,
    title: 'Новый продукт',
    image:
      'https://cdn.leroymerlin.ru/lmru/image/upload/v1685436473/b_white,c_pad,d_photoiscoming.png,f_auto,h_2000,q_auto,w_2000/lmcode/6NRtfqqQJUerv_qXbg-QXw/83656926_01.png',
    description:
      'alsdjf;l jsadlfj sa;ldfj;las;djf;l asjdf;lsajd;lf jsaldjflsajdflsa jdlfjsaldjfsaldjflasdjfl jsadlfjas;l djfasldfj;lsadjf ;lsadfjsal djflsdjflsa djlfdsjalf jsda;lfj dlsj',
    createdAt: '10.01.2004',
  },
  {
    id: 3,
    title: 'Новый продукт',
    image:
      'https://cdn.leroymerlin.ru/lmru/image/upload/v1685436473/b_white,c_pad,d_photoiscoming.png,f_auto,h_2000,q_auto,w_2000/lmcode/6NRtfqqQJUerv_qXbg-QXw/83656926_01.png',
    description:
      'alsdjf;l jsadlfj sa;ldfj;las;djf;l asjdf;lsajd;lf jsaldjflsajdflsa jdlfjsaldjfsaldjflasdjfl jsadlfjas;l djfasldfj;lsadjf ;lsadfjsal djflsdjflsa djlfdsjalf jsda;lfj dlsj',
    createdAt: '10.01.2004',
  },
];

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
