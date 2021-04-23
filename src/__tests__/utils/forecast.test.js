import { celsiusToFahrenheit, fahrenheitToCelcius, roundToTemp } from '../../utils/forecast';

describe('utils > forecast', () => {

  it('#fahrenheitCelsius() converts from fahrenheit to celcius', async () => {
    expect(fahrenheitToCelcius(77)).toEqual(25)
    expect(fahrenheitToCelcius(77)).not.toEqual(19)
  });


  it('#celsiusToFahrenheit() converts from celcius to fahrenheit', async () => {
    expect(celsiusToFahrenheit(5)).toEqual(41)
    expect(celsiusToFahrenheit(5)).not.toEqual(17);
  });

  it('#roundToTemp() rounds up temperature value to nearest whole num', async () => {
    expect(roundToTemp(5.59989)).toEqual(Math.round(5.59989))
    expect(roundToTemp(5.59989)).not.toEqual(5)
  });

});