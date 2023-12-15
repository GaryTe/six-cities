import {Fragment} from 'react';
import { Rating } from '../../const';

export default function StarsRatingComponent(): JSX.Element {
  return(
    <div className="reviews__rating-form form__rating" >
      {Object.values(Rating).map((rating, id) =>(
        <Fragment key={rating}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={5 - id}
            id={`${5 - id}-stars`}
            type="radio"
          />
          <label
            htmlFor={`${5 - id}-stars`}
            className="reviews__rating-label form__rating-label"
            title={rating}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      )
      )}
    </div>
  );
}
