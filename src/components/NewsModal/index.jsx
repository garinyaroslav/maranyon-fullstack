import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';

import s from './NewsModal.module.scss';
import { addNews, fetchNews, fetchOneNews, updateNews } from '../../redux/news/asyncActions';

const newsTitles = ['id', 'title', 'image', 'description', 'createdAt'];

export const NewsModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const [editableItem, setEditableItem] = useState({});

  useEffect(() => {
    if (editableProductId) {
      dispatch(fetchOneNews(editableProductId)).then((data) => setEditableItem(data.payload));
    }
  }, [isOpen]);

  const { register, handleSubmit, reset } = useForm({ values: type === 'edit' ? editableItem : {} });

  const onSubmit = async (data) => {
    switch (type) {
      case 'edit':
        await dispatch(
          updateNews({
            ...data,
            id: Number(data.id),
          }),
        );
        break;
      case 'add':
        await dispatch(
          addNews({
            ...data,
            id: Number(data.id),
          }),
        );
        break;
      default:
        break;
    }
    onCansel();
    await dispatch(fetchNews());
  };

  const onCansel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.root}>
        <h3>{type === 'edit' ? 'Update news' : 'New news'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.items}>
            {newsTitles.map((t, i) => {
              return (
                <div key={i} className={s.inputBox}>
                  <span className={s.inputLabel}>{t}</span>
                  <Input disabled={type === 'edit' && t === 'id'} name={t} register={register} />
                </div>
              );
            })}
          </div>
          <div className={s.buttons}>
            <Button onClick={onCansel} title={'Отмена'} />
            <Button type={'submit'} title={'Готово'} />
          </div>
        </form>
      </div>
    </Modal>
  );
};