import { useEffect } from 'react';
import s from './AdminPanel.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/product/asyncActions';
import { TitlesLine } from '../../components/TitlesLine';
import { ElemsList } from '../../components/ElemsList';

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const productTitles = ['id', 'title', 'imageUrls', 'description', 'category', 'price', 'color', 'weight', 'size'];

  if (status === 'success')
    return (
      <div className={s.root}>
        <h1 className={s.mainTitle}>Admin panel</h1>
        <h3 className={s.subTitle}>Products</h3>
        <TitlesLine titles={productTitles} />
        <ElemsList elems={items} />
      </div>
    );
};
