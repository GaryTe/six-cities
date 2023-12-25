import {
  Fragment,
  Dispatch,
  SetStateAction
} from 'react';
import { Rating } from '../../const';

type StarsRatingComponentProps = {
  valueRating: number;
  onSetRating: Dispatch<SetStateAction<number>>;
}

export default function StarsRatingComponent({valueRating, onSetRating}: StarsRatingComponentProps): JSX.Element {
  return(
    <div className="reviews__rating-form form__rating" >
      {Object.values(Rating).map((rating, id) => {
        const number = 5 - id;

        return (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={5 - id}
              id={`${5 - id}-stars`}
              type="radio"
              onChange={() => onSetRating(5 - id)}
            />
            <label
              htmlFor={`${5 - id}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating}
            >
              <svg
                className="form__star-image"
                style={valueRating >= number ? {fill: '#ff9000'} : {fill: '#c7c7c7'}}
                width={37}
                height={33}
              >
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        );}
      )}
    </div>
  );
}
