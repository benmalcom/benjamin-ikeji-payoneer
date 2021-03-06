import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { Button, Container, Box } from '@material-ui/core';
import dayjs from 'dayjs';
import {
  fetchForecasts,
  resetForecastState,
  applyMetricToForecasts,
  setCurrentMetric,
  setCurrentDate,
} from 'redux/actions';
import { requestKeys } from 'services/_request/keys';
import ForecastCarousel from 'components/Weather/ForecastCarousel';
import MetricSwitcher from 'components/Weather/MetricSwitcher';
import Loading from 'components/UI/Loading';
import DailyWeatherBarChart from 'components/Weather/DailyWeatherChart';
import usePrevious from 'utils/hooks/use-previous';
import styles from './WeatherInfo.module.scss';
import { metricValues } from '../../utils/forecast';

const PARAMS = { q: 'Munich,de', units: 'metric' };

const Forecast = () => {
  const dispatch = useDispatch();
  const { forecastsForNextDays, loading, currentMetric, forecastsByDate, error, currentDate, byList } = useSelector(
    ({ forecasts, ui }) => ({
      allForecastList: forecasts.byList,
      forecastsForNextDays: forecasts.forNextDays,
      forecastsByDate: forecasts.byDate,
      currentMetric: forecasts.currentMetric,
      loading: ui.loading[requestKeys.fetchForecasts],
      error: ui.errors[requestKeys.fetchForecasts],
      currentDate: forecasts.currentDate,
    })
  );

  const getForecasts = (params) => dispatch(fetchForecasts(params));

  useEffect(() => {
    getForecasts(PARAMS);
    return () => {
      dispatch(resetForecastState());
    };
  }, []);

  useEffect(() => {
    if (forecastsForNextDays?.length) dispatch(applyMetricToForecasts(currentMetric));
    if (previousCurrentDate) dispatch(setCurrentDate(previousCurrentDate));
  }, [currentMetric]);

  useEffect(() => {
    if (forecastsForNextDays?.length) {
      const todayForecast = forecastsForNextDays[0];
      const date = previousCurrentDate || dayjs(todayForecast.dt_txt).format('DD/MM/YYYY');
      dispatch(setCurrentDate(date));
    }
  }, [forecastsForNextDays]);

  useEffect(() => {
    if (
      (!previousByList?.length && byList?.length) ||
      (previousByList?.length && byList.length && previousByList?.length !== byList.length)
    ) {
      if (currentMetric && currentMetric !== metricValues.CELCIUS) dispatch(applyMetricToForecasts(currentMetric));
    }
  }, [byList]);

  const previousByList = usePrevious(byList);
  const previousCurrentDate = usePrevious(currentDate);

  const onMetricChange = (e) => dispatch(setCurrentMetric(e.target.value));

  const onCardItemClick = (date) => dispatch(setCurrentDate(date));

  const forecastsForSelectedDate = forecastsByDate ? forecastsByDate[currentDate] : [];

  const getWeatherContent = () => (
    <>
      {' '}
      {forecastsForNextDays && (
        <ForecastCarousel
          currentMetric={currentMetric}
          setCurrentDate={setCurrentDate}
          metric={currentMetric}
          selectedDate={currentDate}
          items={forecastsForNextDays}
          onCardItemClick={onCardItemClick}
        />
      )}
      {forecastsForSelectedDate && <DailyWeatherBarChart metric={currentMetric} data={forecastsForSelectedDate} />}
    </>
  );

  const hasError = !!error;

  return loading ? (
    <Loading />
  ) : (
    <Container className={styles.container}>
      <Box className={cx(styles['action-bar'], { [styles['has-error']]: !!hasError })}>
        {!hasError && <MetricSwitcher value={currentMetric} onChange={onMetricChange} />}
        <Button
          color="primary"
          variant="contained"
          onClick={() => getForecasts(PARAMS)}
          className={styles['refresh-btn']}
        >
          Refresh
        </Button>
      </Box>
      <Box className={cx(styles['weather-content'], { [styles['has-error']]: !!hasError })}>
        {hasError && <div className={styles.error}>{error}</div>}
        {!hasError && getWeatherContent()}
      </Box>
    </Container>
  );
};

export default Forecast;
