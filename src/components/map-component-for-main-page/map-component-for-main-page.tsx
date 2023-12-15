import {useRef, useEffect} from 'react';
import L, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCreatMap } from '../../hooks/use-creat-map/use-creat-map';
import { Offers, Offer } from '../../types/Response';

type MapComponentForMainPageProps = {
  offers: Offers;
  idOffer: number;
};

export default function MapComponentForMainPage({offers, idOffer}: MapComponentForMainPageProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const groupPoints = useRef<LayerGroup | null>(null);

  useEffect(() => {

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

    const layerGroup = L.layerGroup();

    offers.forEach((dataOffer: Offer) => {
      const {location:{latitude, longitude}} = dataOffer;

      const marker = L.marker([latitude, longitude], {
        icon: idOffer === dataOffer.id ? activeCustomIcon : defaultCustomIcon
      });
      marker.addTo(layerGroup);

    });
    groupPoints.current = layerGroup;

    return () => {
      layerGroup.clearLayers();
      groupPoints.current = null;
    };
  },[offers, idOffer]);

  const map = useCreatMap(mapRef, offers, idOffer);

  if(map !== null && groupPoints.current !== null) {
    groupPoints.current.addTo(map);
  }

  return(
    <div className="cities__right-section">
      <section
        className="cities__map map"
        ref={mapRef}
      />
    </div>
  );
}
