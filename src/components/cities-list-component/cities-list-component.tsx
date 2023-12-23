import { Offers } from '../../types/response';
import { getSortOffersByCity } from '../../util/util';
import { CitiesList } from '../../const';

type CitiesListComponentProps = {
  state: {
    offers: Offers;
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
}

export default function CitiesListComponent({state:{offers, indicatorOffer, onSetIndicatorOffer}}: CitiesListComponentProps): JSX.Element {
  const {valueCitie, dataOffers} = indicatorOffer;

  const changeLengthOffers = (nameCitie: string) => {
    let offersList = dataOffers;

    offersList = getSortOffersByCity({
      offersList: offers,
      nameCitie: nameCitie,
    });
    onSetIndicatorOffer({
      ...indicatorOffer,
      valueCitie: nameCitie,
      dataOffers: offersList
    });
  };

  return(
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          { Object.values(CitiesList).map((nameCitie) => (
            <li
              className="locations__item"
              key={nameCitie}
              onClick={() => {
                changeLengthOffers(nameCitie);
              }}
            >
              <a
                className={
                  valueCitie === nameCitie ?
                    'locations__item-link tabs__item tabs__item--active'
                    :
                    'locations__item-link tabs__item'
                }
                href="#todo"
              >
                <span>{nameCitie}</span>
              </a>
            </li>
          )
          )}
        </ul>
      </section>
    </div>
  );
}
