import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import s from './NewsItem.module.scss';
import { fetchReviewByNewsId } from '../../redux/review/asyncActions';
import { useDispatch } from 'react-redux';

export const NewsItem = ({ newsObj }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, reset } = useForm({ defaultValues: {} });
  const [commentStage, setCommentStage] = useState('name');
  const name = getValues('name');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(fetchReviewByNewsId(newsObj.id)).then((data) => setComments(data.payload));
  }, []);

  const changeStage = () => {
    if (name && name.length > 0) setCommentStage('text');
  };

  const onSubmit = async (data) => {
    setCommentStage('name');
    reset();
  };

  return (
    <div className={s.root}>
      <div className={s.newsBody}>
        <img src={newsObj.image} alt="newsImage" />
        <div className={s.text}>
          <div>
            <span className={s.title}>{newsObj.title}</span>
            <span className={s.date}>{newsObj.createdAt} | 0 Комментариев</span>
            <p>{newsObj.description}</p>
          </div>
        </div>
      </div>
      <div className={s.divider}></div>
      <div className={s.comments}>
        {comments.map((obj) => (
          <div key={obj.id} className={s.comment}>
            <img src="/img/avatar.svg" alt="avatar" />
            <div className={s.textSide}>
              <div className={s.commentName}>{obj.userName}</div>
              <p>{obj.text}</p>
            </div>
          </div>
        ))}
        <div className={s.myComment}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <img src="/img/avatar.svg" alt="avatar" />
            <div>
              {commentStage === 'name' && (
                <>
                  <Input name={'name'} placeholder={'Ваше имя'} register={register} width={300} />
                  <Button
                    style={{ width: 120, marginTop: '20px' }}
                    styleType={'green'}
                    type={'button'}
                    title={'Далее'}
                    onClick={changeStage}
                  />
                </>
              )}
              {commentStage === 'text' && (
                <>
                  <span className={s.commentName}>{name}</span>
                  <Input name={'text'} placeholder={'Ваш комментарий'} register={register} width={600} />
                  <Button
                    style={{ width: 210, marginTop: '20px' }}
                    styleType={'green'}
                    type={'submit'}
                    title={'Оставить комментарий'}
                  />
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
