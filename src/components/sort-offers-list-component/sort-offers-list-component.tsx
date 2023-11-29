import {useState} from 'react';
import CardPlaceComponent from '../card-place-component/card-place-component';
import { Offers } from '../../types/Response';
import { NameSortList } from '../../const';
import { getSortOffersBySort } from '../../util/util';

type SortOffersListComponentProps = {
  state: {
    indicatorOffer: {
      valueCitie: string;
      valueSort: string;
      dataOffers: Offers;
  };
    onSetIndicatorOffer: React.Dispatch<React.SetStateAction<{
      valueCitie: string;
      valueSort: string;
      dataOffers: Offers;
  }>>;
    };
};

export default function SortOffersListComponent({state:{indicatorOffer, onSetIndicatorOffer}}: SortOffersListComponentProps): JSX.Element {
  const {valueCitie, valueSort, dataOffers} = indicatorOffer;

  const [isValueSwitch, setIsValueSwitch] = useState(false);

  const changeLengthOffers = (nameSort: string) => {
    let offersList = dataOffers;

    if(nameSort !== NameSortList.Popular) {
      offersList = getSortOffersBySort({
        offersList: dataOffers,
        nameSort: nameSort
      });
      onSetIndicatorOffer({
        ...indicatorOffer,
        valueSort: nameSort,
        dataOffers: offersList
      });
      return;
    }

    onSetIndicatorOffer({...indicatorOffer});
  };

  return(
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {dataOffers.length === 1 ? `${dataOffers.length} place` : `${dataOffers.length} places`} to stay in {valueCitie}
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span
            className="places__sorting-type"
            tabIndex={0}
            onClick={() => setIsValueSwitch((isValue) => !isValue)}
            data-testid="spanElement"
          >
            {` ${valueSort} `}
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          {isValueSwitch &&
          <ul className="places__options places__options--custom places__options--opened">
            {Object.values(NameSortList).map((nameSort) => (
              <li
                className={
                  valueSort === nameSort ?
                    'places__option places__option--active'
                    :
                    'places__option'
                }
                tabIndex={0}
                key={nameSort}
                onClick={() => {
                  changeLengthOffers(nameSort);
                  setIsValueSwitch((isValue) => !isValue);
                }}
              >
                {nameSort}
              </li>
            )
            )}
          </ul>}
        </form>
        <CardPlaceComponent offers={dataOffers}/>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>
  );
}
