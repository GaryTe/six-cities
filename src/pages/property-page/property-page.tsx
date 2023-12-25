import {useNavigate, useLocation, Link} from 'react-router-dom';
import { useEffect } from 'react';
import HeaderComponent from '../../components/header-component/header-component';
import ErrorComponent from '../../components/error-component/error-component';
import ReviewComponent from '../../components/review-component/review-component';
import LoadingCardPlaceComponent from '../../components/loading-card-place-component/loading-card-place-component';
import MapComponentForPropertyPage from '../../components/map-component-for-property-page/map-component-for-property-page';
import FeedbackFormComponent from '../../components/feedback-form-component/feedback-form-component';
import { Address, AuthorizationStatus } from '../../const';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks-store/hooks-store';
import { requestChangesStatus } from '../../api/request';
import { storageOffer } from '../../store/slice-reducer/offer-slice/offer-slice';
import { storageOffersNearby } from '../../store/slice-reducer/offers-nearby-slice/offers-nearby-slice';
import { storageAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';


export default function PropertyPage(): JSX.Element {
  const {offer, typeError} = useAppSelector(storageOffer);
  const {offersListNearby} = useAppSelector(storageOffersNearby);
  const {isAuthorizationStatus} = useAppSelector(storageAuthorization);

  const {pathname} = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[pathname]);

  if(typeError) {
    return(
      <div className='loading-items'>
        <p className='parameters-text-error'>
          {typeError.code}<br></br>
          <br></br>
          <Link
            style={{fontFamily: 'serif'}}
            to={Address.Main}
          >
            Click me for go back to main page.
          </Link>
        </p>
      </div>
    );
  }

  if(!offer) {
    return <ErrorComponent/>;
  }

  const {
    images,
    title,
    description,
    isFavorite,
    isPremium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    id
  } = offer;

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
                  style={{backgroundColor: isFavorite ? '#4481c3' : ''}}
                  type="button"
                  onClick={() => {
                    if(isAuthorizationStatus) {
                      dispatch(requestChangesStatus({
                        hotelId: id,
                        status: !isFavorite
                      }));
                    }
                    navigate(Address.Favorites, {
                      state: {hotelId: id, status: !isFavorite}
                    });
                  }}
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
                {isAuthorizationStatus === AuthorizationStatus.Auth && <FeedbackFormComponent index={id}/>}
              </section>
            </div>
          </div>
          <MapComponentForPropertyPage
            offer={offer}
            offers={[offer, ...offersListNearby].slice(0,4)}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            <LoadingCardPlaceComponent classForElement={classForElement}/>
          </section>
        </div>
      </main>
    </div>);
}
