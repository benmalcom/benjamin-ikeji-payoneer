import React from 'react';
import { render } from '@testing-library/react';
import MetricSwitcher from 'components/Weather/MetricSwitcher';
import { metricValues } from 'utils/forecast';

describe('MetricSwitcher', () => {
  const handleChange = jest.fn();
  const value = metricValues.CELCIUS;
  const getComponent = props => render(<MetricSwitcher {...props} />);

  it('renders without crash', async () => {
    const component = getComponent({ value, onChange: handleChange });
    expect(component).toMatchSnapshot();
  });

});