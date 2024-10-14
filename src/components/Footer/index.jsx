import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.newsletter}>
        <span>Подпишитесь на рассылку</span>
        <div className={styles.input}>
          <input type="email" placeholder="your@email.com" />
          <button>Подписаться</button>
        </div>
      </div>
      <div className={styles.faq}>
        <ul>
          <li>О нас</li>
          <li>FAQs</li>
          <li>Новости</li>
          <li>Карьера</li>
          <li>Свяжитесь с нами</li>
        </ul>
      </div>
    </footer>
  );
};
