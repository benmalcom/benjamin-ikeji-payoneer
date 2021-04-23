import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import dayjs from 'dayjs';
import forecastPropTypes from 'utils/prop-types/forecast';
import { useSelector } from 'react-redux';

import styles from './Forecast.module.scss';
import { metricValuesIconMap, roundToTemp } from 'utils/forecast';


const Forecast = (props) => {
  const { weatherData, onClick, selectedDate } = props;
  const { currentMetric } = useSelector(({ forecasts: { currentMetric } }) => ({ currentMetric }));
  const date = dayjs(weatherData.dt_txt).format('DD/MM/YYYY');
  const wordedDate = dayjs(weatherData.dt_txt).format(`DD MMM, YYYY`);
  return <Card className={cx(styles.card, date === selectedDate && styles.selected)} onClick={() => onClick(date)}>
    <CardContent>
      <CardMedia
        className={styles.image}
        component='img'
        alt='forecast-icon'
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`}
      />
      <Typography variant='body2' color='textSecondary' align='center'>
        {weatherData.weather[0]?.main}
      </Typography>
      <Typography gutterBottom variant='h4' component='h2' align='center'>
        {`${roundToTemp(weatherData.main.temp)}${metricValuesIconMap[currentMetric]}`}

      </Typography>
      <Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
        {wordedDate}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary' align='center' component='p'>
        Average Temp: {`${roundToTemp(weatherData.avg_temp)}${metricValuesIconMap[currentMetric]}`}
      </Typography>
    </CardContent>
  </Card>;
};

Forecast.propTypes = {
  weatherData: PropTypes.shape(forecastPropTypes).isRequired,
  onClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
};

Forecast.defaultProps = {
  selectedDate: null
};


export default Forecast;