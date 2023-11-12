import 'react-native-gesture-handler';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Wrapper from './Wrapper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Wrapper />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
export default App;
