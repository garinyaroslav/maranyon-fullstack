import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';

import { ProductBlock } from '../ProductBlock';

import styles from './Slick.module.scss';
import './slick.scss';
import './slick-theme.scss';

export const Slick = () => {
  const { items } = useSelector((state) => state.product);
  const [hasSetPosition, setHasSetPosition] = React.useState(false);
  const slider = React.useRef(null);
  const initialSlidePosition = 1;

  React.useEffect(() => {
    if (slider.current && !hasSetPosition) {
      slider.current.slickGoTo(initialSlidePosition);
      setHasSetPosition(true);
    }
  }, [initialSlidePosition, hasSetPosition, slider]);

  const settings = {
    initialSlide: 1,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styles.root}>
      <h1>Сейчас в тренде</h1>
      <Slider ref={slider} className={styles.slider} {...settings}>
        {items.map((obj, i) => (
          <ProductBlock
            key={i}
            id={obj.id}
            image={obj.imageUrls[0]}
            title={obj.title}
            price={obj.price}
          />
        ))}
      </Slider>
    </div>
  );
};
