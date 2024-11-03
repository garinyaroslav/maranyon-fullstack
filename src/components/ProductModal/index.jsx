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

const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];

export const ProductModal = ({ isOpen, onClose, type, editableProductId = null }) => {
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.product);
  const [editableItem, setEditableItem] = useState({});
  const [newId, setNewId] = useState('');

  useEffect(() => {
    if (editableProductId) {
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
  }, [isOpen]);

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
        await dispatch(updateProduct(newObj));
        break;
      case 'add':
        await dispatch(addProduct(newObj));
        break;
      default:
        break;
    }
    onCansel();
    await dispatch(fetchProducts());
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
                      {fields.map((image, i) => (
                        <TextArea key={image.id} width={222} height={41} name={`${t}.${i}.value`} register={register} />
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
