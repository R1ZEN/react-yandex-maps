import type { NextPage } from 'next';
import { YMaps, Map, Placemark } from '../react-yandex-maps';
import { useEffect, useState } from 'react';

const rnd = () => (Math.random() - 0.5) * 0.2;

const [lat, lon] = [55.75, 37.57];

const PlacemarkExample: NextPage = () => {
  const [offset, setOffset] = useState([0, 0]);

  useEffect(() => {
    setInterval(() => {
      setOffset([rnd(), rnd()]);
    }, 1000);
  }, []);

  return (
    <YMaps>
      <Map
        state={{ center: [lat, lon], zoom: 9 }}
        width={'100%'}
        height={'300px'}
      >
        <Placemark geometry={[lat + offset[0], lon + offset[1]]} />
      </Map>
    </YMaps>
  );
};

export default PlacemarkExample;
