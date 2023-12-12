import { reviews } from '../../mocks/reviews';
import {
  humanizingData,
  filterLatestReviews
} from '../../util/util';

export default function ReviewComponent(): JSX.Element {

  if(reviews.length === 0) {
    return(
      <p className="reviews__text">
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
