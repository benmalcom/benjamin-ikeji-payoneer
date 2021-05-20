import {
  apiRequest,
  APPLY_METRICS_TO_FORECASTS,
  FETCH_FORECASTS,
  updateForecastList,
  applyMetricToForecasts as applyMetricToForecastsFn,
} from '../actions';
import { requestKeys } from '../../services/_request/keys';
import { celsiusToFahrenheit, fahrenheitToCelcius, metricValues } from '../../utils/forecast';

const fetchForecasts = ({ dispatch, getState }) => (next) => (action) => {
  next(action);
  if (action.type === FETCH_FORECASTS.START) {
    const {
      ui: { pagination },
    } = getState();
    const { key = requestKeys.fetchForecasts, params, ...rest } = action.meta;

    const defaultPagination = pagination.default;

    dispatch(
      apiRequest({
        url: '/forecast',
        key: key,
        params: {
          ...params,
          ...defaultPagination,
        },
        onSuccess: (data) => {
          const {
            forecasts: { byList, currentMetric },
          } = getState();
          const isNewList = !byList?.length;
          dispatch({ type: FETCH_FORECASTS.SUCCESS, payload: data?.list || [] });
          if (isNewList && currentMetric !== metricValues.CELCIUS) dispatch(applyMetricToForecastsFn(currentMetric));
        },
        ...rest,
      })
    );
  }
};

const applyMetricToForecasts = ({ dispatch, getState }) => (next) => (action) => {
  next(action);
  if (action.type === APPLY_METRICS_TO_FORECASTS) {
    const { metric } = action.meta;
    const {
      forecasts: { byList },
    } = getState();
    if (!metric || !byList?.length) return;

    const payload = byList.map((item) => {
      const isToCelcius = metricValues.CELCIUS === metric;
      const metricFunc = isToCelcius ? fahrenheitToCelcius : celsiusToFahrenheit;

      return {
        ...item,
        main: {
          ...item.main,
          temp: metricFunc(item.main?.temp),
          feels_like: metricFunc(item.main?.feels_like),
          temp_min: metricFunc(item.main?.temp_min),
          temp_max: metricFunc(item.main?.temp_max),
        },
      };
    });
    dispatch(updateForecastList(payload));
  }
};

export default [fetchForecasts, applyMetricToForecasts];
