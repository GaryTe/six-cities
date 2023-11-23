import HeaderComponent from '../../components/header-component/header-component';
import CitiesListComponent from '../../components/cities-list-component/cities-list-component';
import OffersListComponent from '../../components/offers-list-component/offers-list-component';
import CardPlaceComponent from '../../components/card-place-component/card-place-component';

export default function MainPage(): JSX.Element {
  return(
    <div className="page page--gray page--main">
      <HeaderComponent/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesListComponent/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
              Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <OffersListComponent/>
              </form>
              <CardPlaceComponent/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
