import React from 'react';
import { render } from '@testing-library/react';
import App from 'components/App/App';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';

describe('App', () => {
  it('renders properly', async () => {
    const component = render(<Provider store={createTestStore()}><App /></Provider>);
    expect(component).toMatchSnapshot();
  });

});