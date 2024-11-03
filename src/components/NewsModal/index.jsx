import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const { items: news } = useSelector((state) => state.news);
  const [newId, setNewId] = useState('');

  useEffect(() => {
    if (editableProductId) {
      dispatch(fetchOneNews(editableProductId)).then((data) => setEditableItem(data.payload));
    } else {
      let maxId = 0;
      for (const newsItem of news) {
        if (maxId < newsItem.id) maxId = newsItem.id;
      }
      setNewId(maxId + 1);
    }
  }, [isOpen]);

  const { register, handleSubmit, reset } = useForm({ values: type === 'edit' ? editableItem : { id: newId } });

  const onSubmit = async (data) => {
    const newObj = {
      ...data,
      id: Number(data.id),
    };

    switch (type) {
      case 'edit':
        await dispatch(updateNews(newObj));
        break;
      case 'add':
        await dispatch(addNews(newObj));
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
