import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteReview, fetchReviews } from '../../redux/review/asyncActions';
import { ReviewModal } from '../ReviewsModal';

import s from './ReviewsList.module.scss';

export const ReviewList = ({ elems }) => {
  console.log(elems);

  const dispatch = useDispatch();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editableProductId, setEditableProductId] = useState(null);

  const onDeleteReview = async (id) => {
    await dispatch(deleteReview(id));
    await dispatch(fetchReviews());
  };

  const editProduct = (id) => {
    setEditableProductId(id);
    setEditModalIsOpen(true);
  };

  return (
    <>
      <ReviewModal isOpen={addModalIsOpen} onClose={() => setAddModalIsOpen(false)} type={'add'} />
      <ReviewModal
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
                <img onClick={() => onDeleteReview(elem.id)} src="/img/remove.svg" alt="remove" />
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
