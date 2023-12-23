import CardPlaceComponent from '../card-place-component/card-place-component';
import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { storageOffersNearby } from '../../store/slice-reducer/offers-nearby-slice/offers-nearby-slice';

type LoadingCardPlaceComponentProps = {
  classForElement: {
    classForDivElement: {
        firstClass: string;
        secondClass: string;
    };
    firstClassForAticleElement: string;
    valueForSlice: number;
};
};

export default function LoadingCardPlaceComponent({classForElement}: LoadingCardPlaceComponentProps): JSX.Element {
  const {loading, offersListNearby, typeError} = useAppSelector(storageOffersNearby);

  if(typeError) {
    return(
      <p className="text-loding" style={{backgroundColor: 'red'}}>
        ${typeError.code}<br></br>
        <br></br>
        Could not get offers nearby.
      </p>
    );
  }

  return(
    loading ?
      <p className='text-loding'>
    ...Loading offers nearby. Wait please.
      </p>
      :
      <CardPlaceComponent offers={offersListNearby} classForElement={classForElement}/>
  );
}
