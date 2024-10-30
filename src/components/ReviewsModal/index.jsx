import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';
import { addReview, fetchOneReview, fetchReviews, updateReview } from '../../redux/review/asyncActions';

import s from './ReviewsModal.module.scss';

const reviewTitles = ['id', 'newsId', 'userName', 'text'];

export const ReviewModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const [editableItem, setEditableItem] = useState({});

  useEffect(() => {
    if (editableProductId) dispatch(fetchOneReview(editableProductId)).then((data) => setEditableItem(data.payload));
  }, [isOpen]);

  const { register, handleSubmit, reset } = useForm({ values: type === 'edit' ? editableItem : {} });

  const onSubmit = async (data) => {
    switch (type) {
      case 'edit':
        await dispatch(
          updateReview({
            ...data,
            id: Number(data.id),
            newsId: Number(data.newsId),
          }),
        );
        break;
      case 'add':
        await dispatch(
          addReview({
            ...data,
            id: Number(data.id),
            newsId: Number(data.newsId),
          }),
        );
        break;
      default:
        break;
    }
    onCansel();
    await dispatch(fetchReviews());
  };

  const onCansel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.root}>
        <h3>{type === 'edit' ? 'Update review' : 'New review'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.items}>
            {reviewTitles.map((t, i) => {
              return (
                <div key={i} className={s.inputBox}>
                  <span className={s.inputLabel}>{t}</span>
                  <Input
                    disabled={(type === 'edit' && t === 'id') || (type === 'edit' && t === 'newsId')}
                    name={t}
                    register={register}
                  />
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
