import s from './Input.module.scss';

export const Input = ({
  width,
  register = null,
  name,
  disabled,
  value = null,
  onChange = null,
  onKeyDown = null,
  type = 'text',
  placeholder,
}) => {
  if (register !== null)
    return (
      <input
        {...register(name, { required: true })}
        type={type}
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
        type={type}
        onKeyDown={onKeyDown}
        oplaceholder={placeholder}
        disabled={disabled}
        style={{ width: width + 'px' }}
        className={s.input}
      />
    );
  else return null;
};
