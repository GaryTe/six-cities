import {useNavigate} from 'react-router-dom';
import { Offers } from '../../types/Response';
import { Address } from '../../const';

type CardPlaceComponentProps = {
  offers: Offers;
};

export default function CardPlaceComponent({offers}: CardPlaceComponentProps): JSX.Element {

  const navigate = useNavigate();

  return(
    <div className="cities__places-list places__list tabs__content">
      {offers.slice(0,5).map((offer) => {

        const {previewImage, isPremium, price, title, type, rating, id} = offer;

        return(
          <article className="cities__card place-card" key={id}>
            {isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>}
            <div className="cities__image-wrapper place-card__image-wrapper">
              <a href="#todo">
                <img
                  className="place-card__image"
                  src={previewImage}
                  width={260}
                  height={200}
                  alt={title}
                />
              </a>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">€{price}</b>
                  <span className="place-card__price-text">/&nbsp;night</span>
                </div>
                <button
                  className="place-card__bookmark-button place-card__bookmark-button--active button"
                  type="button"
                  onClick={() => navigate(Address.Favorites)}
                >
                  <svg
                    className="place-card__bookmark-icon"
                    width={18}
                    height={19}
                  >
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <a href="#todo">
                  {title}
                </a>
              </h2>
              <p className="place-card__type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p>
            </div>
          </article>);
      }) }
    </div>);
}
