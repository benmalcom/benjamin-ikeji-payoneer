import React from 'react';
import { render } from '@testing-library/react';
import Forecast from 'components/Weather/Forecast';
import mockWeatherData from 'utils/mock-data/weatherData.json';
import dayjs from 'dayjs';
import { metricValuesIconMap, roundToTemp } from 'utils/forecast';

describe('components > Forecast', () => {
  const onClick = jest.fn();
  const selectedDate = '12/11/2020';
  const weatherData = mockWeatherData[0];
  const currentMetric = 'C';
  const getComponent = props => render(<Forecast {...props} />);

  it('renders without crash', async () => {
    const component = getComponent({
      onClick,
      selectedDate,
      weatherData,
      currentMetric
    });
    expect(component).toMatchSnapshot();
  });

  it('renders with forecast values', async () => {
    const { getByText, getByAltText } = getComponent({
      onClick,
      selectedDate,
      weatherData,
      currentMetric
    });
    const displayDate = dayjs(weatherData.dt_txt).format('DD MMM, YYYY');

    const mainTemp = `${roundToTemp(276.84).toString()}${metricValuesIconMap['C']}`
    const mainTempRegEx = new RegExp(mainTemp, 'i');

    const avgTemp = `${Number(288).toString()}${metricValuesIconMap['C']}`;
    const avgTempRegEx = new RegExp(avgTemp, 'i');


    expect(getByText(/Clear/i)).toBeInTheDocument();
    expect(getByText(/288/i)).toBeInTheDocument();
    expect(getByText(mainTempRegEx)).toBeInTheDocument();
    expect(getByText(avgTempRegEx)).toBeInTheDocument();
    expect(getByAltText(/forecast-icon/i)).toBeInTheDocument();
    expect(getByText(`${displayDate}`)).toBeInTheDocument();
  });

});