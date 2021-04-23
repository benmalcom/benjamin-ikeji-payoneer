export const metrics = {
  CELCIUS: 'Celcius',
  FAHRENHEIT: 'Fahrenheit',
};

export const metricValues = {
  CELCIUS: 'C',
  FAHRENHEIT: 'F',
};

export const metricValuesIconMap = {
  C: '\xB0C',
  F: '\xB0F',
};

export const celsiusToFahrenheit = value => value * 9 / 5 + 32;

export const fahrenheitToCelcius = value => (value - 32) * 5 / 9;

export const roundToTemp = value => Math.round(value);
