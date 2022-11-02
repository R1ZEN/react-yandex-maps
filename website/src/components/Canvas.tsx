import React from 'react';
import CodeBlock from '@theme/CodeBlock';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import * as ReactYandexMaps from '@pbe/react-yandex-maps';
import { LiveProvider, LivePreview } from 'react-live';

interface PlaygroundCodeProps {
  children: string;
  scope?: Record<string, any>;
}

export const Canvas: React.FC<PlaygroundCodeProps> = ({ children, scope = {} }) => (
  <LiveProvider code={children} scope={{ ...ReactYandexMaps, ...scope }}>
    <Tabs>
      <TabItem value="playground" label="Preview" default>
        <CodeBlock>
          <LivePreview />
        </CodeBlock>
      </TabItem>
      <TabItem value="code" label="Source Code">
        <CodeBlock language="jsx">{children}</CodeBlock>
      </TabItem>
    </Tabs>
  </LiveProvider>
);
