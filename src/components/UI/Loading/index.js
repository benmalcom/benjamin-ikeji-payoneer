import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styles from './Loading.module.scss';

const Loading = () => <Box className={styles.box}>
  <Typography gutterBottom variant='h5' component='h5' align='center'>
    Loading...
  </Typography>
</Box>;

export default Loading;
