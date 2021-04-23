import React from 'react';
import { render } from '@testing-library/react';
import Carousel from 'components/Weather/Carousel';
import mockWeatherData from 'utils/mock-data/weatherData.json';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';

describe('Carousel', () => {
  const getComponent = props => render(<Provider store={createTestStore()}><Carousel {...props} /></Provider>);

  it('renders without crash', async () => {
    const items = mockWeatherData;
    const onCardItemClick = jest.fn();
    const selectedDate = null;
    const component = getComponent({
      items,
      onCardItemClick,
      selectedDate,
    });
    expect(component).toMatchSnapshot();
  });
});