import s from './Button.module.scss';

export const Button = ({ title, onClick, type = 'button', style = {}, styleType = 'black' }) => {
  return (
    <input
      type={type}
      value={title}
      style={style}
      className={styleType === 'black' ? s.buttonBlack : styleType === 'green' ? s.buttonGreen : null}
      onClick={onClick}
    />
  );
};
