import 'antd/dist/antd.css';
import { AppProps } from 'next/app';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import './index.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Component {...pageProps} />
);

export default MyApp;
