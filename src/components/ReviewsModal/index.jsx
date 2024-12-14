import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';
import { addReview, fetchOneReview, fetchReviews, updateReview } from '../../redux/review/asyncActions';
import { TextArea } from '../ui/TextArea';

import s from './ReviewsModal.module.scss';

const reviewTitles = [
  { lab: 'ИД', val: 'id' },
  { lab: 'ИД новости', val: 'newsId' },
  { lab: 'Имя пользователя', val: 'userName' },
  { lab: 'Текст', val: 'text' },
];

export const ReviewModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const [editableItem, setEditableItem] = useState({});
  const { items: reviews } = useSelector((state) => state.review);
  const [newId, setNewId] = useState('');

  useEffect(() => {
    if (editableProductId) {
      dispatch(fetchOneReview(editableProductId)).then((data) => setEditableItem(data.payload));
    } else {
      let maxId = 0;
      for (const review of reviews) {
        if (maxId < review.id) maxId = review.id;
      }
      setNewId(maxId + 1);
    }
  }, [isOpen]);

  const { register, handleSubmit, reset } = useForm({ values: type === 'edit' ? editableItem : { id: newId } });

  const onSubmit = async (data) => {
    const newObj = {
      ...data,
      id: Number(data.id),
      newsId: Number(data.newsId),
    };

    switch (type) {
      case 'edit':
        const resUp = await dispatch(updateReview(newObj));
        if (resUp.payload === undefined) {
          alert('Нет доступа');
          return;
        }
        onCansel();
        break;
      case 'add':
        const resAd = await dispatch(addReview(newObj));
        if (resAd.payload === undefined) {
          alert('Нет доступа');
          return;
        }
        onCansel();
        break;
      default:
        break;
    }

    await dispatch(fetchReviews());
  };

  const onCansel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.root}>
        <h3>{type === 'edit' ? 'Обновить отзыв' : 'Новый отзыв'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.items}>
            {reviewTitles.map((t) => {
              return (
                <div key={t.val} className={s.inputBox}>
                  <span className={s.inputLabel}>{t.lab}</span>
                  {t.val === 'text' ? (
                    <TextArea width={222} height={41} name={t.val} register={register} />
                  ) : (
                    <Input
                      disabled={(type === 'edit' && t.val === 'id') || (type === 'edit' && t.val === 'newsId')}
                      name={t.val}
                      register={register}
                    />
                  )}
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
