import s from './Button.module.scss';

export const Button = ({ title, onClick, type = 'button' }) => {
  return <input type={type} value={title} className={s.button} onClick={onClick} />;
};
