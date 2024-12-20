import s from './TitlesLine.module.scss';

export const TitlesLine = ({ titles }) => {
  return (
    <div className={s.root}>
      {[...titles, 'Действия'].map((t, i) => (
        <span key={i} className={s.rootElem}>
          {t}
        </span>
      ))}
    </div>
  );
};
