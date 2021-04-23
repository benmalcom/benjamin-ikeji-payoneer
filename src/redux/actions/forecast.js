import { createActionType, createActionString } from './_create';

export const FETCH_FORECASTS = createActionType('FETCH_FORECASTS', 'Weather');
export const RESET_FORECAST_STATE = createActionType('RESET_FORECAST_STATE', 'Weather');
export const APPLY_METRICS_TO_FORECASTS = createActionString('APPLY_METRICS_TO_FORECASTS', 'Forecast');
export const UPDATE_FORECAST_LIST = createActionString('UPDATE_FORECAST_LIST', 'Forecast');
export const SET_CURRENT_METRIC = createActionString('SET_CURRENT_METRIC', 'Temperature');

export const fetchForecasts = (params = {}) => ({
  type: FETCH_FORECASTS.START,
  meta: {
    params,
  },
});

export const resetForecastState = () => ({
  type: RESET_FORECAST_STATE.START,
});

export const applyMetricToForecasts = (metric) => ({
  type: APPLY_METRICS_TO_FORECASTS,
  meta: {
    metric,
  },
});

export const updateForecastList = (payload) => ({
  type: UPDATE_FORECAST_LIST,
  payload,
});

export const setCurrentMetric = (metric) => ({
  type: SET_CURRENT_METRIC,
  payload: metric,
});


