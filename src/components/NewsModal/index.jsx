import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';
import { TextArea } from '../ui/TextArea';

import s from './NewsModal.module.scss';

const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];

export const NewsModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const [editableItem, setEditableItem] = useState({});

  useEffect(() => {
    if (editableProductId) {
      // dispatch(fetchProduct(editableProductId)).then((data) =>
      //   setEditableItem({ ...data.payload, imageUrls: JSON.stringify(data.payload.imageUrls) }),
      // );
    }
  }, [isOpen]);

  const { register, handleSubmit, reset } = useForm({ values: type === 'edit' ? editableItem : {} });

  const onSubmit = async (data) => {
    switch (type) {
      case 'edit':
        await dispatch();
        // updateProduct({
        //   ...data,
        //   id: Number(data.id),
        //   price: Number(data.price),
        //   imageUrls: JSON.parse(data.imageUrls),
        // }),
        break;
      case 'add':
        await dispatch();
        // addProduct({
        //   ...data,
        //   id: Number(data.id),
        //   price: Number(data.price),
        //   imageUrls: JSON.parse(data.imageUrls),
        // }),
        break;
      default:
        break;
    }
    onCansel();
    // await dispatch(fetchProducts());
  };

  const onCansel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.root}>
        <h3>{type === 'edit' ? 'Update product' : 'New product'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.items}>
            {productTitles.map((t, i) => {
              return (
                <div key={i} className={s.inputBox}>
                  <span className={s.inputLabel}>{t}</span>
                  {t === 'imageUrls' ? (
                    <div className={s.clue}>
                      <TextArea width={222} name={t} register={register} />
                      <p>Вводить в форматe JSON массива</p>
                    </div>
                  ) : (
                    <Input disabled={type === 'edit' && t === 'id'} name={t} register={register} />
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
