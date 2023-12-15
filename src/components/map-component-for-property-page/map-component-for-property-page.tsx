import {useRef, useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCreatMap } from '../../hooks/use-creat-map/use-creat-map';
import { Offers, Offer } from '../../types/Response';

type MapComponentForPropertyPageProps = {
  offer: Offer;
  offers: Offers;
};

export default function MapComponentForPropertyPage({offers, offer}: MapComponentForPropertyPageProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);

  const map = useCreatMap(mapRef, offers);

  useEffect(() => {
    if(map === null) {return;}

    const activeCustomIcon = L.icon({
      iconUrl: 'img/pin-active.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const defaultCustomIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const layerGroup = L.layerGroup().addTo(map);

    offers.forEach((dataOffer: Offer) => {
      const {location:{latitude, longitude}} = dataOffer;

      const marker = L.marker([latitude, longitude], {
        icon: dataOffer.id === offer.id ? activeCustomIcon : defaultCustomIcon
      });
      marker.addTo(layerGroup);

    });

    return () => {
      layerGroup.clearLayers();
    };
  },[map, offer, offers]);

  return(
    <section
      className="property__map map"
      style={{height: '579px'}}
      ref={mapRef}
    />
  );
}
