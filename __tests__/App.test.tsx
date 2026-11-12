import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders storefront app correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(<App />);
    await new Promise(resolve => setTimeout(() => resolve(undefined), 350));
  });
});
