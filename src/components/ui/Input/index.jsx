import s from './Input.module.scss';

export const Input = ({
  width,
  register = null,
  name,
  disabled,
  value = null,
  onChange = null,
  onKeyDown = null,
  placeholder,
}) => {
  if (register !== null)
    return (
      <input
        {...register(name)}
        onKeyDown={onKeyDown}
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
        nChange={onChange}
        onKeyDown={onKeyDown}
        oplaceholder={placeholder}
        disabled={disabled}
        style={{ width: width + 'px' }}
        className={s.input}
      />
    );
  else return null;
};
