import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNews, fetchNews } from '../../redux/news/asyncActions';
import { NewsModal } from '../NewsModal';

import s from './NewsList.module.scss';

export const NewsList = ({ elems }) => {
  const dispatch = useDispatch();
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editableProductId, setEditableProductId] = useState(null);

  const onDeleteNews = async (id) => {
    await dispatch(deleteNews(id));
    await dispatch(fetchNews());
  };

  const editProduct = (id) => {
    setEditableProductId(id);
    setEditModalIsOpen(true);
  };

  return (
    <>
      <NewsModal isOpen={addModalIsOpen} onClose={() => setAddModalIsOpen(false)} type={'add'} />
      <NewsModal
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
                <img onClick={() => onDeleteNews(elem.id)} src="/img/remove.svg" alt="remove" />
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
