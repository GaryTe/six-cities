import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { storageReviews } from '../../store/slice-reducer/reviews-list-slice/reviews-list-slice';
import {
  humanizingData,
  filterLatestReviews
} from '../../util/util';
import './text-loding.css';

export default function ReviewComponent(): JSX.Element {
  const {loading, reviews, typeError} = useAppSelector(storageReviews);

  if(loading) {
    return(
      <p className='text-loding'>
        ...Loading comments. Wait please.
      </p>
    );
  }

  if(typeError) {
    return(
      <p className="text-loding" style={{backgroundColor: 'red'}}>
        ${typeError.code}<br></br>
        <br></br>
        Could not get comments.
      </p>
    );
  }

  if(reviews.length === 0) {
    return(
      <p className="text-loding">
        No reviews.
      </p>
    );
  }

  const sortReviews = filterLatestReviews(reviews);

  return(
    <>
      <h2 className="reviews__title">
              Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortReviews.slice(0,11).map((review) =>{
          const {id,
            user:{name, avatarUrl},
            rating,
            comment,
            date
          } = review;

          const humanData = humanizingData(date);
          const {ferstData, secondData} = humanData;

          return(
            <li key={id} className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{ width: `${Math.round(rating) * 20}%` }} />
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment}
                </p>
                <time className="reviews__time" dateTime={secondData}>
                  {ferstData}
                </time>
              </div>
            </li>);
        }
        )}
      </ul>
    </>
  );
}
