import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { v1 as uuid } from 'uuid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.scss';

import WeatherCard from '../Forecast';
import { Box, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import forecastProptypes from '../../../utils/prop-types/forecast';

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
      breakpoint: 600,
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
  const { items, onCardItemClick, selectedDate } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const gotoNext = () => {
    sliderRef.current.slickNext();
  };

  const gotoPrevious = () => {
    sliderRef.current.slickPrev();
  };

  settings.afterChange = index => setCurrentSlide(index);

  const showLeftArrow = currentSlide > 0;
  const showRightArrow = !!items[currentSlide + 3];

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
  selectedDate: PropTypes.string,
};

WeatherCarousel.defaultProps = {
  selectedDate:null
};


export default WeatherCarousel;