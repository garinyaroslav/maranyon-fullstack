import s from './TextArea.module.scss';

export const TextArea = ({ width, register, name }) => {
  return <textarea {...register(name)} style={{ width: width + 'px' }} className={s.textArea} />;
};
