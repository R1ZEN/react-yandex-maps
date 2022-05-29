module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        measure: false,
        outline: false,
        toolbars: false,
        controls: false,
        actions: false,
      },
    },
  ],
  framework: '@storybook/react',
};
