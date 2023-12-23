import HeaderComponent from '../../components/header-component/header-component';
import FooterComponents from '../../components/footer-component/footer-component';
import {
  useAppSelector,
  useAppDispatch
} from '../../hooks/hooks-store/hooks-store';
import { requestChangesStatus } from '../../api/request';
import { storageOffersListFavorite } from '../../store/slice-reducer/favorite-slice/favorite-slice';
import { sortOffersByCity } from '../../util/util';

export default function FavoritesPage(): JSX.Element {

  const dispatch = useAppDispatch();

  const {loading, offersList, typeError} = useAppSelector(storageOffersListFavorite);

  if(loading) {
    return(
      <div className='loading-items'>
        <p className='text-options'>...Loading list of favorite offers. Wait please.</p>
      </div>
    );
  }

  if(typeError) {
    return(
      <div className='loading-items'>
        <p className='parameters-text-error'>
          {typeError.code}
        </p>
      </div>
    );
  }

  if(offersList.length === 0) {
    return(
      <div className="page page--favorites-empty">
        <HeaderComponent/>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <FooterComponents/>
      </div>
    );
  }

  const sortOffersList = sortOffersByCity(offersList);

  return(
    <div className="page">
      <HeaderComponent/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {sortOffersList.map((dataOffer) =>(
                <li key={dataOffer.nameCity} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#todo">
                        <span>{dataOffer.nameCity}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {dataOffer.offers.map((offer) =>{
                      const {
                        previewImage,
                        isFavorite,
                        isPremium,
                        price,
                        title,
                        type,
                        rating,
                        id
                      } = offer;

                      return (
                        <article key={offer.id} className="favorites__card place-card">
                          {isPremium &&
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <a href="#todo">
                              <img
                                className="place-card__image"
                                src={previewImage}
                                width={150}
                                height={110}
                                alt={title}
                              />
                            </a>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">{price}</b>
                                <span className="place-card__price-text">
                        /&nbsp;night
                                </span>
                              </div>
                              <button
                                className={!offer.isFavorite ? 'place-card__bookmark-button button' : 'place-card__bookmark-button place-card__bookmark-button--active button'}
                                type="button"
                                onClick={() => {
                                  dispatch(requestChangesStatus({
                                    hotelId: id,
                                    status: !isFavorite
                                  }));
                                }}
                              >
                                <svg
                                  className="place-card__bookmark-icon"
                                  width={18}
                                  height={19}
                                >
                                  <use xlinkHref="#icon-bookmark" />
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{ width: `${Math.round(rating) * 20}%` }} />
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <a href="#todo">{title}</a>
                            </h2>
                            <p className="place-card__type">{`${type[0].toUpperCase()}${type.slice(1)}`}</p>
                          </div>
                        </article>);
                    }
                    )}
                  </div>
                </li>)
              )}
            </ul>
          </section>
        </div>
      </main>
      <FooterComponents/>
    </div>

  );
}
