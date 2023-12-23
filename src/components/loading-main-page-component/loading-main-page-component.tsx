import MainPage from '../../pages/main-page/main-page';
import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { storageOffers } from '../../store/slice-reducer/offers-list-slice/offers-list-slice';
import './loading-items.css';
import './text-options.css';

export default function LoadingMainPageComponent(): JSX.Element {
  const {loading} = useAppSelector(storageOffers);

  return(
    loading ?
      <div className='loading-items'>
        <p className='text-options'>...Loading data. Wait please.</p>
      </div>
      :
      <MainPage/>
  );
}
