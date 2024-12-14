import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useDispatch } from 'react-redux';
import { addProduct, fetchProduct, fetchProducts, updateProduct } from '../../redux/product/asyncActions';
import { TextArea } from '../ui/TextArea';

import s from './ProductModal.module.scss';

const productTitles = [
  { lab: 'ИД', val: 'id' },
  { lab: 'Название', val: 'title' },
  { lab: 'Картинки', val: 'imageUrls' },
  { lab: 'Описание', val: 'description' },
  { lab: 'Категория', val: 'category' },
  { lab: 'Цена', val: 'price' },
  { lab: 'Цвет', val: 'color' },
  { lab: 'Вес', val: 'weight' },
  { lab: 'Размер', val: 'size' },
];

const options = [
  { value: 'furnitures', label: 'Мебель' },
  { value: 'lamps', label: 'Люстры' },
  { value: 'electronics', label: 'Электроника' },
  { value: 'kitchen', label: 'Кухня' },
  { value: 'chairs', label: 'Стулья' },
  { value: 'mirrors', label: 'Зеркала' },
];

export const ProductModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.product);
  const [editableItem, setEditableItem] = useState({});
  const [newId, setNewId] = useState('');

  useEffect(() => {
    if (editableProductId !== null) {
      dispatch(fetchProduct(editableProductId)).then((data) => {
        let imagesArr = [];

        for (const image of data.payload.imageUrls) imagesArr.push({ value: image });

        setEditableItem({ ...data.payload, imageUrls: imagesArr });
      });
    } else {
      let maxId = 0;
      for (const product of products) {
        if (maxId < product.id) maxId = product.id;
      }
      setNewId(maxId + 1);
    }
  }, [isOpen, editableProductId]);

  const { register, handleSubmit, reset, control } = useForm({
    values: type === 'edit' ? editableItem : { id: newId, imageUrls: [{ value: '' }] },
  });
  const { fields, append } = useFieldArray({
    control,
    name: 'imageUrls',
  });

  const onSubmit = async (data) => {
    let imagesArr = [];

    for (const image of data.imageUrls) imagesArr.push(image.value);

    const newObj = {
      ...data,
      id: Number(data.id),
      price: Number(data.price),
      imageUrls: imagesArr,
    };

    switch (type) {
      case 'edit':
        const resUp = await dispatch(updateProduct(newObj));
        if (resUp.payload === undefined) {
          alert('Ошибка валидации или нет доступа');
          return;
        }
        onCansel();
        break;
      case 'add':
        const resAd = await dispatch(addProduct(newObj));
        console.log(resAd);
        if (resAd.payload === undefined) {
          alert('Ошибка валидации или нет доступа');
          return;
        }
        onCansel();
        break;
      default:
        break;
    }
    await dispatch(fetchProducts());
  };

  const onCansel = () => {
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div onClick={(e) => e.stopPropagation()} className={s.root}>
        <h3>{type === 'edit' ? 'Обновить товар' : 'Новый товар'}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.items}>
            {productTitles.map((t, i) => {
              return (
                <div key={i} className={s.inputBox}>
                  <span className={s.inputLabel}>{t.lab}</span>
                  {t.val === 'imageUrls' ? (
                    <div className={s.clue}>
                      {fields.map((image, i) => (
                        <TextArea
                          key={image.id}
                          width={222}
                          height={41}
                          name={`${t.val}.${i}.value`}
                          register={register}
                        />
                      ))}
                      {fields.length < 3 && (
                        <div
                          onClick={() => {
                            append({ value: '' });
                          }}
                        >
                          <img src="/img/plus.svg" alt="add-elem" />
                        </div>
                      )}
                    </div>
                  ) : t.val === 'category' ? (
                    <select
                      {...register('category', { required: true })}
                      style={{
                        width: 222,
                        background: '#fff',
                        border: '1px solid #000',
                        padding: 12,
                      }}
                    >
                      {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : t.val === 'description' ? (
                    <TextArea width={222} height={41} name={t.val} register={register} />
                  ) : (
                    <Input disabled={type === 'edit' && t.val === 'id'} name={t.val} register={register} />
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
