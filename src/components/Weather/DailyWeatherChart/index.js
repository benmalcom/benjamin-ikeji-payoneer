import React from 'react';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { Box } from '@material-ui/core';
import { roundToTemp } from 'utils/forecast';
import styles from './DailyWeatherChart.module.scss';
import PropTypes from 'prop-types';
import forecastProptypes from 'utils/prop-types/forecast';


const getOptions = (metric) => {

  return {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{

        barThickness: 3,  // number (pixels) or 'flex'
        maxBarThickness: 3, // number (pixels)
      }],
      yAxes: [
        {
          ticks: {
            display: true,
            beginAtZero: true,
            callback (value, index, values) {
              return value + metric;
            },
          },
        },
      ],
    },
  };
};

const DailyWeatherBarChart = (props) => {
  const chartData = {
    labels: props.data.map(item => dayjs(item.dt_txt).format('h:mm A')),
    datasets: [
      {
        label: 'Temperatures',
        data: props.data.map(item => roundToTemp(item.main.temp)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Box className={styles.box}>
    <Bar type='vertical' data={chartData} options={getOptions(props.metric)} />
  </Box>;

};

DailyWeatherBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(forecastProptypes)).isRequired,
};


export default DailyWeatherBarChart;