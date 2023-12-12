import {useNavigate} from 'react-router-dom';
import './container_for_component_error.css';
import './message.css';
import './button_for_component_error.css';
import { Address } from '../../const';

export default function ErrorComponent(): JSX.Element {
  const navigate = useNavigate();
  return(
    <div className="container_for_component_error">
      <p className="message">404 Not Found</p>
      <button className="button_for_component_error" onClick={() => navigate(Address.Main)}>Click me</button>
    </div>
  );
}
