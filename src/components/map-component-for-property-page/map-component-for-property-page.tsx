import {useRef, useEffect} from 'react';
import L, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCreatMap } from '../../hooks/use-creat-map/use-creat-map';
import { Offers, Offer } from '../../types/response';

type MapComponentForPropertyPageProps = {
  offer: Offer;
  offers: Offers;
};

export default function MapComponentForPropertyPage({offer, offers}: MapComponentForPropertyPageProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const groupPoints = useRef<LayerGroup | null>(null);

  const [ferstList] = offers;

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
        icon: dataOffer.id === offer.id ? activeCustomIcon : defaultCustomIcon
      });
      marker.addTo(layerGroup);

    });
    groupPoints.current = layerGroup;

    return () => {
      layerGroup.clearLayers();
      groupPoints.current = null;
    };
  },[offer, offers]);

  const map = useCreatMap(mapRef, ferstList);

  if(map !== null && groupPoints.current !== null) {
    groupPoints.current.addTo(map);
  }

  return(
    <section
      className="property__map map"
      style={{height: '579px'}}
      ref={mapRef}
    />
  );
}
