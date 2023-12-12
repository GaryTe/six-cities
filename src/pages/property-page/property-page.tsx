import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import HeaderComponent from '../../components/header-component/header-component';
import ErrorComponent from '../../components/error-component/error-component';
import ReviewComponent from '../../components/review-component/review-component';
import CardPlaceComponent from '../../components/card-place-component/card-place-component';
import MapComponentForPropertyPage from '../../components/map-component-for-property-page/map-component-for-property-page';
import { Offers, Offer } from '../../types/Response';
import { getSortOffersByCity } from '../../util/util';
import { Address } from '../../const';

type PropertyPageProps = {
  offers: Offers;
}

export default function PropertyPage({offers}: PropertyPageProps): JSX.Element {

  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {idex} = useParams<string>();
  const dataOffer: Offer | undefined = offers.find((offer) => offer.id === Number(idex));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[pathname]);

  if(!dataOffer) {
    return <ErrorComponent/>;
  }

  const offersNear = getSortOffersByCity({
    offersList: offers,
    nameCitie: dataOffer.city.name
  });

  const {
    images,
    title,
    description,
    isPremium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host
  } = dataOffer;

  const {name, isPro, avatarUrl} = host;

  const classForElement = {
    classForDivElement: {
      firstClass: 'near-places__list places__list',
      secondClass: 'near-places__image-wrapper place-card__image-wrapper'
    },
    firstClassForAticleElement: 'near-places__card place-card',
    valueForSlice: 3
  };

  return(
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img
                    className="property__image"
                    src={image}
                    alt={type}
                  />
                </div>)
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
              <div className="property__mark">
                <span>Premium</span>
              </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button
                  className="property__bookmark-button button"
                  type="button"
                  onClick={() => navigate(Address.Favorites)}
                >
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${Math.round(rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {`${type[0].toUpperCase()}${type.slice(1)}`}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms > 1 ? `${bedrooms}Bedrooms` : `${bedrooms}Bedroom`}
                </li>
                <li className="property__feature property__feature--adults">
                  {maxAdults > 1 ? `Max ${maxAdults} adults` : `Max ${maxAdults} adult`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((thing) => <li key={thing} className="property__inside-item">{thing}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewComponent/>
                <form className="reviews__form form" action="#" method="post">
                  <label className="reviews__label form__label" htmlFor="review">
                Your review
                  </label>
                  <div className="reviews__rating-form form__rating">
                    <input
                      className="form__rating-input visually-hidden"
                      name="rating"
                      defaultValue={5}
                      id="5-stars"
                      type="radio"
                    />
                    <label
                      htmlFor="5-stars"
                      className="reviews__rating-label form__rating-label"
                      title="perfect"
                    >
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                    <input
                      className="form__rating-input visually-hidden"
                      name="rating"
                      defaultValue={4}
                      id="4-stars"
                      type="radio"
                    />
                    <label
                      htmlFor="4-stars"
                      className="reviews__rating-label form__rating-label"
                      title="good"
                    >
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                    <input
                      className="form__rating-input visually-hidden"
                      name="rating"
                      defaultValue={3}
                      id="3-stars"
                      type="radio"
                    />
                    <label
                      htmlFor="3-stars"
                      className="reviews__rating-label form__rating-label"
                      title="not bad"
                    >
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                    <input
                      className="form__rating-input visually-hidden"
                      name="rating"
                      defaultValue={2}
                      id="2-stars"
                      type="radio"
                    />
                    <label
                      htmlFor="2-stars"
                      className="reviews__rating-label form__rating-label"
                      title="badly"
                    >
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                    <input
                      className="form__rating-input visually-hidden"
                      name="rating"
                      defaultValue={1}
                      id="1-star"
                      type="radio"
                    />
                    <label
                      htmlFor="1-star"
                      className="reviews__rating-label form__rating-label"
                      title="terribly"
                    >
                      <svg className="form__star-image" width={37} height={33}>
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </label>
                  </div>
                  <textarea
                    className="reviews__textarea form__textarea"
                    id="review"
                    name="review"
                    placeholder="Tell how was your stay, what you like and what can be improved"
                    defaultValue={''}
                  />
                  <div className="reviews__button-wrapper">
                    <p className="reviews__help">
                  To submit review please make sure to set{' '}
                      <span className="reviews__star">rating</span> and describe
                  your stay with at least{' '}
                      <b className="reviews__text-amount">50 characters</b>.
                    </p>
                    <button
                      className="reviews__submit form__submit button"
                      type="submit"
                      disabled
                    >
                  Submit
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
          <MapComponentForPropertyPage offer={dataOffer} offers={offersNear.slice(0,4)} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <CardPlaceComponent offers={offersNear} classForElement={classForElement}/>
          </section>
        </div>
      </main>
    </div>);
}
