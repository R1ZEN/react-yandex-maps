# React Yandex Maps

[![npm](https://img.shields.io/npm/v/@pbe/react-yandex-maps)](https://www.npmjs.com/package/@pbe/react-yandex-maps)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@pbe/react-yandex-maps)](https://bundlephobia.com/package/@pbe/react-yandex-maps)

[Yandex Maps API][ymaps-api] bindings for React

[ymaps-api]:
  https://tech.yandex.com/maps/doc/jsapi/2.1/quick-start/index-docpage/

### Features

- Supports TypeScript out of the box
- Automatic yamps api and modules loading
- Declarative rendering

### Installation

npm:

```
npm install @pbe/react-yandex-maps
```

yarn:

```
yarn add @pbe/react-yandex-maps
```

### Getting Started

Try running a simple example:

```jsx
import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export default function App() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  return (
    <YMaps>
      <Map defaultState={defaultState}>
        <Placemark geometry={[55.684758, 37.738521]} />
      </Map>
    </YMaps>
  );
}
```

### Documentation

The React Yandex Maps docs are located at
[website](https://pbe-react-yandex-maps.vercel.app)

- [Getting Started](https://pbe-react-yandex-maps.vercel.app/)
- [Core Principles](https://pbe-react-yandex-maps.vercel.app/core-principles/)
- [API Reference](https://pbe-react-yandex-maps.vercel.app/category/api-reference/)

### Contribution

We appreciate your help!

To contribute, please read our [contributing instructions](./CONTRIBUTING.md).

### License

[MIT](./LICENSE)
