import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';

import * as ReactYandexMaps from '@pbe/react-yandex-maps';
import { LiveProvider, LivePreview } from 'react-live';
import prettier from 'prettier/standalone';
import prettierParserBabel from 'prettier/parser-babel';

interface PlaygroundCodeProps {
  children: string;
  scope?: Record<string, unknown>;
}

const formatCode = (code: string) =>
  prettier.format(code, {
    plugins: [prettierParserBabel],
  });

export const Canvas: React.FC<PlaygroundCodeProps> = ({
  children,
  scope = {},
}) => (
  <BrowserOnly>
    {() => (
      <LiveProvider code={children} scope={{ ...ReactYandexMaps, ...scope }}>
        <Tabs>
          <TabItem
            value="preview"
            label={translate({
              message: 'Просмотр',
              id: 'components.canvas.preview',
            })}
            default
          >
            <CodeBlock>
              <LivePreview />
            </CodeBlock>
          </TabItem>
          <TabItem
            value="code"
            label={translate({
              message: 'Исходный код',
              id: 'components.canvas.code',
            })}
          >
            <CodeBlock language="jsx">{formatCode(children)}</CodeBlock>
          </TabItem>
        </Tabs>
      </LiveProvider>
    )}
  </BrowserOnly>
);
