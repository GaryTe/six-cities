import {useState, useEffect, MutableRefObject} from 'react';
import L, { Map } from 'leaflet';
import { Offers } from '../../types/Response';

export const useCreatMap = (
  mapRef: MutableRefObject<HTMLElement | null>,
  offers: Offers,
  idOffer?: number
) => {
  const [map, setMap] = useState<null | Map>(null);

  const [ferstList] = offers;

  useEffect(() => {
    const {current} = mapRef;
    const {city:{location:{latitude,longitude,zoom}}} = ferstList;

    if(current === null) {return;}

    const mapCity = L.map(current,{
      center: [latitude, longitude],
      zoom: zoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
      .addTo(mapCity);

    setMap(mapCity);

    return () => {
      mapCity.remove();
      setMap(null);
    };

  },[mapRef, ferstList, idOffer]);

  return map;
};
