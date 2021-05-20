import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Box } from '@material-ui/core';
import dayjs from 'dayjs';
import { fetchForecasts, resetForecastState, applyMetricToForecasts, setCurrentMetric } from 'redux/actions';
import { requestKeys } from 'services/_request/keys';
import ForecastCarousel from 'components/Weather/ForecastCarousel';
import MetricSwitcher from 'components/Weather/MetricSwitcher';
import Loading from 'components/UI/Loading';
import DailyWeatherBarChart from 'components/Weather/DailyWeatherChart';
import usePrevious from 'utils/hooks/use-previous';
import styles from './WeatherInfo.module.scss';

const PARAMS = { q: 'Munich,de', units: 'metric' };

const Forecast = () => {
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const { forecastsForNextDays, loading, currentMetric, forecastsByDate } = useSelector(({ forecasts, ui }) => ({
    forecastsForNextDays: forecasts.forNextDays,
    forecastsByDate: forecasts.byDate,
    currentMetric: forecasts.currentMetric,
    loading: ui.loading[requestKeys.fetchForecasts],
  }));

  const getForecasts = (params) => dispatch(fetchForecasts(params));

  useEffect(() => {
    getForecasts(PARAMS);
    return () => {
      dispatch(resetForecastState());
    };
  }, []);

  useEffect(() => {
    if (forecastsForNextDays?.length) dispatch(applyMetricToForecasts(currentMetric));
    if (previousCurrentDate) setCurrentDate(previousCurrentDate);
  }, [currentMetric]);

  useEffect(() => {
    if (forecastsForNextDays?.length) {
      const todayForecast = forecastsForNextDays[0];
      const date = previousCurrentDate || dayjs(todayForecast.dt_txt).format('DD/MM/YYYY');
      setCurrentDate(date);
    }
  }, [forecastsForNextDays]);

  const previousCurrentDate = usePrevious(currentDate);

  const onMetricChange = (e) => dispatch(setCurrentMetric(e.target.value));

  const onCardItemClick = (date) => setCurrentDate(date);

  const forecastsForSelectedDate = forecastsByDate[currentDate];

  return loading ? (
    <Loading />
  ) : (
    <Container className={styles.container}>
      <Box className={styles['action-bar']}>
        <MetricSwitcher value={currentMetric} onChange={onMetricChange} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => getForecasts(PARAMS)}
          className={styles['refresh-btn']}
        >
          Refresh
        </Button>
      </Box>
      <ForecastCarousel
        currentMetric={currentMetric}
        setCurrentDate={setCurrentDate}
        metric={currentMetric}
        selectedDate={currentDate}
        items={forecastsForNextDays}
        onCardItemClick={onCardItemClick}
      />
      {forecastsForSelectedDate && <DailyWeatherBarChart metric={currentMetric} data={forecastsForSelectedDate} />}
    </Container>
  );
};

export default Forecast;
