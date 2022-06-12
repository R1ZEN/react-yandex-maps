import type { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { YMaps, useYMaps } from '../react-yandex-maps';

const MapWithRemoteObjectManager = () => {
  const mapRef = useRef(null);
  const ymaps = useYMaps(['Map', 'RemoteObjectManager']);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }

    const map = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 10,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const rom = new ymaps.RemoteObjectManager('/api/tile?bbox=%b');

    map.geoObjects.add(rom);
  }, [ymaps]);

  return <div ref={mapRef} style={{ width: '100vw', height: '100vh' }} />;
};

const RemoveObjectManagerExample: NextPage = () => {
  return (
    <YMaps>
      <MapWithRemoteObjectManager />
    </YMaps>
  );
};

export default RemoveObjectManagerExample;
