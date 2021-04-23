import React from 'react';
import { render } from '@testing-library/react';
import Forecast from 'components/Weather/Forecast';
import mockWeatherData from 'utils/mock-data/weatherData.json';
import { createTestStore } from 'utils/test/test-utils';
import { Provider } from 'react-redux';
import dayjs from 'dayjs';
import { roundToTemp } from 'utils/forecast';

describe('components > Forecast', () => {
  const onClick = jest.fn();
  const selectedDate = '12/11/2020';
  const weatherData = mockWeatherData[0];
  const getComponent = props => render(<Provider store={createTestStore()}><Forecast {...props} /></Provider>);

  it('renders without crash', async () => {
    const component = getComponent({
      onClick,
      selectedDate,
      weatherData,
    });
    expect(component).toMatchSnapshot();
  });

  it('renders with forecast values', async () => {
    const { getByText, getByAltText } = getComponent({
      onClick,
      selectedDate,
      weatherData,
    });
    const displayDate = dayjs(weatherData.dt_txt).format('DD MMM, YYYY');
    const rounded = roundToTemp(276.84);
    const roundedNumberMatch = new RegExp(rounded.toString(), 'i');
    expect(getByText(/Clear/i)).toBeInTheDocument();
    expect(getByText(/288/i)).toBeInTheDocument();
    expect(getByText(roundedNumberMatch)).toBeInTheDocument();
    expect(getByAltText(/forecast-icon/i)).toBeInTheDocument();
    expect(getByText(`${displayDate}`)).toBeInTheDocument();
  });

});