import s from './Input.module.scss';

export const Input = ({ width, register = null, name, disabled, value = null, onChange = null, placeholder }) => {
  if (register !== null)
    return (
      <input
        {...register(name)}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: width + 'px' }}
        className={s.input}
      />
    );
  if (value !== null && onChange)
    return (
      <input
        value={value}
        oplaceholder={placeholder}
        nChange={onChange}
        disabled={disabled}
        style={{ width: width + 'px' }}
        className={s.input}
      />
    );
  else return null;
};
