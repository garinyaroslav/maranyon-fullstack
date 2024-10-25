import s from './Input.module.scss';

export const Input = ({ width, register, name, disabled }) => {
  return <input {...register(name)} disabled={disabled} style={{ width: width + 'px' }} className={s.input} />;
};
