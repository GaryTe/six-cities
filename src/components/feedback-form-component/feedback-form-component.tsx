import {useState, useRef} from 'react';
import {toast} from 'react-toastify';
import StarsRatingComponent from '../stars-rating-component/stars-rating-component';
import { useAppDispatch } from '../../hooks/hooks-store/hooks-store';
import { requestForReview } from '../../api/request';

type FeedbackFormComponentProps = {
  index: number;
}

type Response = {
  error: {
    code: string;
  };
  };

  type ErrorMessage = {
    message: string;
  };

export default function FeedbackFormComponent({index}: FeedbackFormComponentProps): JSX.Element {
  const refTextarea = useRef<null | HTMLTextAreaElement>(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [lockForm, setLockForm] = useState(false);

  const dispatch = useAppDispatch();

  const submitForm = () => {
    setLockForm(true);
    toast.loading('Sending user comment. Wait please.');

    dispatch(requestForReview({
      index,
      comment: review,
      rating
    }))
      .then((response) => {
        if(response.meta.requestStatus !== 'rejected') {
          return response;
        }

        const {error: {code}} = response as Response;
        throw new Error(code);
      })
      .then(() => {
        toast.dismiss();
        toast.success('Comment received.', {autoClose: 6000});
        setLockForm(false);
        setReview('');
        if(refTextarea.current) {refTextarea.current.value = '';}
        setRating(0);
      })
      .catch((error) => {
        const {message} = error as ErrorMessage;
        toast.dismiss();
        toast.error(message, {autoClose: 6000});
        setLockForm(false);
      });
  };

  return(
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        submitForm();
      }}
    >
      <fieldset disabled={lockForm} style={{border: 'none'}}>
        <label className="reviews__label form__label" htmlFor="review">
Your review
        </label>
        <StarsRatingComponent valueRating={rating} onSetRating={setRating}/>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved. Review length from 50 to 300 symbol."
          required
          onChange={({target:{value}}) => {
            if(value.length >= 50 && value.length <= 300) {
              setReview(value);
            }else{
              setReview('');
            }
          }}
          ref={refTextarea}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
  To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe
  your stay with at least{' '}
            <b className="reviews__text-amount">50 characters</b>.
          </p>
          {Boolean(review.length) && Boolean(rating) ?
            <button
              className="reviews__submit form__submit button"
              type="submit"
            >
          Submit
            </button>
            :
            <button
              className="reviews__submit form__submit button"
              type="submit"
              disabled
            >
          Disabled
            </button>}
        </div>
      </fieldset>
    </form>
  );
}
