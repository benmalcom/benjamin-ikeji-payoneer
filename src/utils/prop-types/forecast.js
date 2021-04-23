import PropTypes from 'prop-types';

export default {
  main: PropTypes.shape({
    temp: PropTypes.number.isRequired,
  }),
  weather: PropTypes.arrayOf(PropTypes.shape(
    {
      main: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ),
  dt_txt: PropTypes.string.isRequired,
  avg_temp: PropTypes.number,
};