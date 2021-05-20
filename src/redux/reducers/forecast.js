import { groupBy, last } from 'lodash';
import dayjs from 'dayjs';
import {
  FETCH_FORECASTS,
  RESET_FORECAST_STATE,
  SET_CURRENT_METRIC,
  UPDATE_FORECAST_LIST,
  SET_CURRENT_DATE,
} from '../actions';
import { metricValues } from '../../utils/forecast';

const initialState = {
  currentMetric: metricValues.CELCIUS,
  currentDate: null,
  byList: [],
  byDate: {},
  forNextDays: [],
};

const forecastReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_FORECAST_LIST:
    case FETCH_FORECASTS.SUCCESS: {
      const byList = payload;
      const byDate = groupBy(byList, (item) => dayjs(item.dt_txt).format('DD/MM/YYYY'));
      const forNextDays = Object.values(byDate).map((groupList) => {
        const item = { ...last(groupList) };
        const sum = groupList.reduce((a, c) => a + c?.main?.temp, 0);
        return {
          ...item,
          avg_temp: sum / groupList.length,
        };
      });

      return Object.assign({}, state, {
        byList,
        byDate,
        forNextDays,
      });
    }
    case SET_CURRENT_METRIC:
      return {
        ...state,
        currentMetric: payload,
      };
    case SET_CURRENT_DATE:
      return {
        ...state,
        currentDate: payload,
      };
    case RESET_FORECAST_STATE:
      return initialState;
    default:
      return state;
  }
};

export default forecastReducer;
