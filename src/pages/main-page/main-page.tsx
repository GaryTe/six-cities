import {
  useState,
  useRef
} from 'react';
import HeaderComponent from '../../components/header-component/header-component';
import CitiesListComponent from '../../components/cities-list-component/cities-list-component';
import SortOffersListComponent from '../../components/sort-offers-list-component/sort-offers-list-component';
import NotFindPlacesComponent from '../../components/not-find-places-component/not-find-places-component';
import { Offers } from '../../types/Response';
import {
  CitiesList,
  NameSortList
} from '../../const';
import { getSortOffersByCity } from '../../util/util';

type MainPageProps = {
  offers: Offers;
};

type IndicatorOffer = {
  valueCitie: string;
  valueSort: string;
  dataOffers: Offers;
}

export default function MainPage({offers}: MainPageProps): JSX.Element {

  const [indicatorOffer, setIndicatorOffer] = useState<IndicatorOffer>({
    valueCitie: CitiesList.Paris,
    valueSort: NameSortList.Popular,
    dataOffers: offers
  });
  const indicatorSort = useRef(true);

  if(indicatorSort.current) {
    indicatorSort.current = false;
    const dataOffer = getSortOffersByCity({
      offersList: offers,
      nameCitie: CitiesList.Paris
    });
    setIndicatorOffer({
      ...indicatorOffer,
      dataOffers: dataOffer
    });
  }

  return(
    <div className="page page--gray page--main">
      <HeaderComponent/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesListComponent state={{
          offers,
          indicatorOffer,
          onSetIndicatorOffer: setIndicatorOffer
        }}
        />
        <div className="cities">
          {indicatorOffer.dataOffers?.length !== 0 ?
            <SortOffersListComponent state={{
              indicatorOffer,
              onSetIndicatorOffer: setIndicatorOffer
            }}
            />
            :
            <NotFindPlacesComponent nameCity={indicatorOffer.valueCitie} />}
        </div>
      </main>
    </div>
  );
}
