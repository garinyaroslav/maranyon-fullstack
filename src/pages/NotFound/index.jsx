import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        <br />
        Ничего не найдено
      </h1>
      <p>К сожелению данная страница отсутствует в нашем интернет-магазине</p>
    </div>
  );
};
