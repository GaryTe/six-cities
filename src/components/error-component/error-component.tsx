import {Link} from 'react-router-dom';
import './container.css';
import './message.css';
import './button.css';
import { Address } from '../../const';

export default function ErrorComponent(): JSX.Element {
  return(
    <div className="container">
      <p className="message">404 Not Found</p>
      <Link className="button" to={Address.Main}>Go to home page</Link>
    </div>
  );
}
