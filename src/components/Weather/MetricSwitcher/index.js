import React from 'react';
import { Box, FormControlLabel, RadioGroup } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './MetricSwitcher.module.scss';
import StyledRadio from '../../UI/StyledRadio';
import { metrics, metricValues } from 'utils/forecast';

const MetricSwitcher = (props) => {
  const { onChange, value } = props;
  return <Box component='div' className={styles['metric-switch-controls']}>
    <RadioGroup className={styles['metric-switch-radio-group']} value={value} onChange={onChange} name='radio-button-metric'>
      <FormControlLabel
        role="radio"
        className={styles['switch-control']}
        value={metricValues.CELCIUS}
        control={<StyledRadio />}
        checked={value === metricValues.CELCIUS}
        label={metrics.CELCIUS} />
      <FormControlLabel
        role="radio"
        className={styles['switch-control']}
        value={metricValues.FAHRENHEIT}
        checked={value === metricValues.FAHRENHEIT}
        control={<StyledRadio />}
        label={metrics.FAHRENHEIT} />
    </RadioGroup>

  </Box>;
};

MetricSwitcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

MetricSwitcher.defaultProps = {
  value: null,
};

export default MetricSwitcher;