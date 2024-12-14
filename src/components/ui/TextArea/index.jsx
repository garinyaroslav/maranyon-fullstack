import s from './TextArea.module.scss';

export const TextArea = ({ width, register, name, height }) => {
  return (
    <textarea
      {...register(name, { required: true })}
      style={{ width: width + 'px', height: height + 'px' }}
      className={s.textArea}
    />
  );
};
