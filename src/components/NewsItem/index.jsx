import s from './NewsItem.module.scss';

export const NewsItem = ({ newsObj }) => {
  return (
    <div className={s.root}>
      <div className={s.newsBody}>
        <img src={newsObj.image} alt={'newsImage'} />
        <div className={s.text}>
          <div>
            <span className={s.title}>{newsObj.title}</span>
            <span className={s.date}>{newsObj.createdAt} | 0 Комментариев</span>
            <p>{newsObj.description}</p>
          </div>
        </div>
      </div>
      <div className={s.divider}></div>
      <div className={s.comments}>
        <div classname={s.comment}></div>
      </div>
    </div>
  );
};
