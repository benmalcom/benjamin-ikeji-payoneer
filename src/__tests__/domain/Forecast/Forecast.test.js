import React from 'react';
import { render } from '@testing-library/react';
import Forecast from 'domain/WeatherInfo';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';


describe('domain > Forecast', () => {
  const getComponent = props => render(<Provider store={createTestStore()}><Forecast {...props} /></Provider>);

  it('renders without crash', async () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

});