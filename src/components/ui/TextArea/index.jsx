import s from './TextArea.module.scss';

export const TextArea = ({ width, register, name, height }) => {
  return <textarea {...register(name)} style={{ width: width + 'px', height: height + 'px' }} className={s.textArea} />;
};
