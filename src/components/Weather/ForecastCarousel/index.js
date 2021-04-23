import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { v1 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ForecastCarousel.module.scss';

import WeatherCard from '../Forecast';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import forecastProptypes from 'utils/prop-types/forecast';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const WeatherCarousel = (props) => {
  const { items, onCardItemClick, selectedDate, setCurrentDate } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const isLowResTableOrMobile = useMediaQuery({ minDeviceWidth: 481, maxDeviceWidth: 768 });
  const isMobile = useMediaQuery({ minDeviceWidth: 320, maxDeviceWidth: 480 });

  const getNumOfVisibleSlides = () => {
    if (isMobile) return 1;
    else if (isLowResTableOrMobile) return 2;
    else return 3;
  }

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const gotoPrevious = () => {
    sliderRef.current.slickPrev();
  };

  settings.afterChange = index => {
    setCurrentSlide(index);
    if (isMobile) {
      const current = items[index];
      if (current) {
        setCurrentDate(dayjs(current.dt_txt).format('DD/MM/YYYY'))
      }
    }
  };

  const showLeftArrow = currentSlide > 0;
  const showRightArrow = !!items[currentSlide + getNumOfVisibleSlides()];

  return <>
    <Box component='div' className={cx(
      styles['controls-container'],
      { [styles['controls-left']]: showLeftArrow && !showRightArrow },
      { [styles['controls-right']]: showRightArrow && !showLeftArrow },
    )}>
      {showLeftArrow && <Button className={styles.controls} onClick={gotoPrevious}>
        <ArrowBackIcon fontSize='large' />
      </Button>}
      {showRightArrow && <Button className={styles.controls} onClick={gotoNext}>
        <ArrowForwardIcon fontSize='large' />
      </Button>}
    </Box>
    <Slider ref={sliderRef} {...settings}>
      {items.map(item => <WeatherCard
        selectedDate={selectedDate}
        onClick={onCardItemClick}
        weatherData={item}
        key={uuid} />)}
    </Slider>
  </>;
};

WeatherCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(forecastProptypes)).isRequired,
  onCardItemClick: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
};

WeatherCarousel.defaultProps = {
  selectedDate: null,
};

export default WeatherCarousel;