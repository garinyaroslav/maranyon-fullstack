import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductModal } from '../ProductModal';
import { fetchProducts, deleteProduct } from '../../redux/product/asyncActions';

import s from './ProductsList.module.scss';

export const ProductsList = ({ elems }) => {
  const dispatch = useDispatch();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editableProductId, setEditableProductId] = useState(null);

  const onDeleteProduct = async (id) => {
    const res = await dispatch(deleteProduct(id));
    if (res.payload === undefined) {
      alert('Не удалось удалить');
      return;
    }
    await dispatch(fetchProducts());
  };

  const editProduct = (id) => {
    setEditableProductId(id);
    setEditModalIsOpen(true);
  };

  return (
    <>
      <ProductModal isOpen={addModalIsOpen} onClose={() => setAddModalIsOpen(false)} type={'add'} />
      <ProductModal
        isOpen={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        type={'edit'}
        editableProductId={editableProductId}
      />
      <div>
        {elems &&
          elems.map((elem, i) => (
            <div key={i} className={s.root}>
              {Object.values(elem).map((e, j) => (
                <span key={j} className={s.rootElem}>
                  {e}
                </span>
              ))}
              <div className={s.iconsElem}>
                <img onClick={() => editProduct(elem.id)} src="/img/edit.svg" alt="edit" />
                <img onClick={() => onDeleteProduct(elem.id)} src="/img/remove.svg" alt="remove" />
              </div>
            </div>
          ))}
        <div onClick={() => setAddModalIsOpen(true)} className={s.plusLine}>
          <img src="/img/plus.svg" alt="add-elem" />
        </div>
      </div>
    </>
  );
};
