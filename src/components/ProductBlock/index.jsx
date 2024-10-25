import { Link } from "react-router-dom";

import styles from "./ProductBlock.module.scss";

export const ProductBlock = ({ id, image, title, price }) => {
  return (
    <Link to={`/app/categories/product/${id}`}>
      <div className={styles.root}>
        <img src={image} alt="product-img" />
        <p>{title}</p>
        <span>{price}₽</span>
      </div>
    </Link>
  );
};
