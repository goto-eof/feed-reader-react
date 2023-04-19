import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import FeedReader from './feedReader';

export const App = () => (
  <ChakraProvider theme={theme}>
    <FeedReader />
  </ChakraProvider>
);
