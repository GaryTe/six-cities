import { useState } from 'react';
import {toast} from 'react-toastify';
import HeaderComponent from '../../components/header-component/header-component';
import CitiesListComponent from '../../components/cities-list-component/cities-list-component';
import SortOffersListComponent from '../../components/sort-offers-list-component/sort-offers-list-component';
import NotFindPlacesComponent from '../../components/not-find-places-component/not-find-places-component';
import { Offers, Error } from '../../types/response';
import {
  NameSortList
} from '../../const';
import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { storageOffers } from '../../store/slice-reducer/offers-list-slice/offers-list-slice';
import { storageAuthorization } from '../../store/slice-reducer/authorization-slice/authorization-slice';
import '../../components/loading-main-page-component/loading-items.css';
import './parameters-text-error.css';

type IndicatorOffer = {
  valueCitie: string;
  valueSort: string;
  dataOffers: Offers;
}

export default function MainPage(): JSX.Element {
  const {cityName, offers, changeOffers, typeError} = useAppSelector(storageOffers);
  const {typeErrorAuthorization} = useAppSelector(storageAuthorization);

  const [indicatorOffer, setIndicatorOffer] = useState<IndicatorOffer>({
    valueCitie: cityName,
    valueSort: NameSortList.Popular,
    dataOffers: changeOffers
  });

  if(typeError) {
    return(
      <div className='loading-items'>
        <p className='parameters-text-error'>
          {typeError.code}
        </p>
      </div>
    );
  }

  if(typeErrorAuthorization) {
    const {error} = typeErrorAuthorization as Error;
    toast.error(error, { autoClose: 10000 });
  }

  return(
    <div className="page page--gray page--main">
      <HeaderComponent/>
      <main className={indicatorOffer.dataOffers?.length !== 0 ?
        'page__main page__main--index'
        :
        'page__main page__main--index page__main--index-empty'}
      >
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
