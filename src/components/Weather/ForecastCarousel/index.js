import React, { useEffect, useRef, useState } from 'react';
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

const deviceBreakpoints = {
  MOBILE: { minDeviceWidth: 320, maxDeviceWidth: 480 },
  LOW_RES_TABLET_OR_MOBILE: { minDeviceWidth: 481, maxDeviceWidth: 768 },
  TABLETS_AND_LAPTOPS: { minDeviceWidth: 1024 },
};

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: deviceBreakpoints.TABLETS_AND_LAPTOPS.minDeviceWidth,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: deviceBreakpoints.LOW_RES_TABLET_OR_MOBILE.maxDeviceWidth,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: deviceBreakpoints.MOBILE.maxDeviceWidth,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const WeatherCarousel = (props) => {
  const { items, onCardItemClick, selectedDate, setCurrentDate, currentMetric } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const isMobile = useMediaQuery(deviceBreakpoints.MOBILE);
  const isLowResTableOrMobile = useMediaQuery(deviceBreakpoints.LOW_RES_TABLET_OR_MOBILE);

  const getNumOfVisibleSlides = () => {
    if (isMobile) return 1;
    else if (isLowResTableOrMobile) return 2;
    else return 3;
  };

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const gotoPrevious = () => {
    sliderRef.current.slickPrev();
  };

  settings.afterChange = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (currentSlide === 0) return;
    const slides = [currentSlide];
    [currentSlide + 1, currentSlide + 2].forEach((index) => {
      if (items[index]) slides.push(index);
    });
    const hasSelection = slides.some((index) => {
      const current = items[index];
      return dayjs(current.dt_txt).format('DD/MM/YYYY') === selectedDate;
    });

    if (!hasSelection) {
      const current = items[currentSlide];
      const newDate = dayjs(current.dt_txt).format('DD/MM/YYYY');
      setCurrentDate(newDate);
    }
  }, [currentSlide]);

  const isLeftArrowVisible = currentSlide > 0;
  const iRightArrowVisible = !!items[currentSlide + getNumOfVisibleSlides()];

  return (
    <>
      <Box
        component="div"
        className={cx(
          styles['controls-container'],
          { [styles['controls-left']]: isLeftArrowVisible && !iRightArrowVisible },
          { [styles['controls-right']]: iRightArrowVisible && !isLeftArrowVisible }
        )}
      >
        {isLeftArrowVisible && (
          <Button className={styles.controls} onClick={gotoPrevious}>
            <ArrowBackIcon fontSize="large" />
          </Button>
        )}
        {iRightArrowVisible && (
          <Button className={styles.controls} onClick={gotoNext}>
            <ArrowForwardIcon fontSize="large" />
          </Button>
        )}
      </Box>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <WeatherCard
            currentMetric={currentMetric}
            selectedDate={selectedDate}
            onClick={onCardItemClick}
            weatherData={item}
            key={uuid}
          />
        ))}
      </Slider>
    </>
  );
};

WeatherCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(forecastProptypes)).isRequired,
  onCardItemClick: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
  currentMetric: PropTypes.string.isRequired,
};

WeatherCarousel.defaultProps = {
  selectedDate: null,
};

export default WeatherCarousel;
