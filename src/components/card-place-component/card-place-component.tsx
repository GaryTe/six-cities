import {useNavigate, Link} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/hooks-store/hooks-store';
import {
  requestToGetOffer,
  requestToGetReviews,
  requestToGetOffersNearby,
  requestChangesStatus
} from '../../api/request';
import { storageAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import { Offers } from '../../types/response';
import { Address } from '../../const';

type CardPlaceComponentProps = {
  offers: Offers;
  classForElement: {
    classForDivElement: {
        firstClass: string;
        secondClass: string;
    };
    firstClassForAticleElement: string;
    valueForSlice: number;
};
onSetIdOffer?: React.Dispatch<React.SetStateAction<number>> | (() => void);
};

export default function CardPlaceComponent({
  offers,
  classForElement,
  onSetIdOffer = () => null}: CardPlaceComponentProps): JSX.Element {

  const {isAuthorizationStatus} = useAppSelector(storageAuthorization);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    classForDivElement:{firstClass, secondClass},
    firstClassForAticleElement,
    valueForSlice
  } = classForElement;

  if(offers.length === 0) {
    return(
      <p className="text-loding">
        No offers nearby.
      </p>
    );
  }

  return(
    <div className={firstClass}>
      {offers.slice(0,valueForSlice).map((offer) => {

        const {previewImage, isFavorite, isPremium, price, title, type, rating, id} = offer;

        return(
          <article
            className={firstClassForAticleElement} key={id}
            onMouseOver={() => onSetIdOffer(id)}
            onMouseOut={() => onSetIdOffer(0)}
          >
            {isPremium &&
          <div className="place-card__mark">
            <span>Premium</span>
          </div>}
            <div className={secondClass}>
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
                  className={!isFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button place-card__bookmark-button--active button'}
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
                <Link
                  onClick={() => {
                    dispatch(requestToGetOffer(id));
                    dispatch(requestToGetReviews(id));
                    dispatch(requestToGetOffersNearby(id));
                  }}
                  to={`${Address.Room}${id}`}
                >
                  {title}
                </Link>
              </h2>
              <p className="place-card__type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p>
            </div>
          </article>);
      }) }
    </div>);
}
