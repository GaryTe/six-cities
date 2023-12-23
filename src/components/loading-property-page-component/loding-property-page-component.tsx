import {Link} from 'react-router-dom';
import PropertyPage from '../../pages/property-page/property-page';
import { useAppSelector } from '../../hooks/hooks-store/hooks-store';
import { storageOffer } from '../../store/slice-reducer/offer-slice/offer-slice';
import { Address } from '../../const';
import '../loading-main-page-component/loading-items.css';
import '../loading-main-page-component/text-options.css';

export default function LoadingPropertyPageComponent(): JSX.Element {

  const {loading} = useAppSelector(storageOffer);

  return(
    loading ?
      <div className='loading-items'>
        <p className='text-options'>
          ...Loading data. Wait please.<br></br>
          <br></br>
          <Link
            style={{fontFamily: 'serif'}}
            to={Address.Main}
          >
            Click me for go back to main page.
          </Link>
        </p>
      </div>
      :
      <PropertyPage/>
  );
}
