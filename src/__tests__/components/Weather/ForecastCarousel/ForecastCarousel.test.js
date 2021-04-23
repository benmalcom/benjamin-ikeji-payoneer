import React from 'react';
import { render } from '@testing-library/react';
import ForecastCarousel from 'components/Weather/ForecastCarousel';
import mockWeatherData from 'utils/mock-data/weatherData.json';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';

describe('ForecastCarousel', () => {
  const getComponent = props => render(<Provider store={createTestStore()}><ForecastCarousel {...props} /></Provider>);

  it('renders without crash', async () => {
    const items = mockWeatherData;
    const onCardItemClick = jest.fn();
    const setCurrentDate = jest.fn();
    const selectedDate = null;
    const component = getComponent({
      items,
      onCardItemClick,
      selectedDate,
      setCurrentDate
    });
    expect(component).toMatchSnapshot();
  });
});