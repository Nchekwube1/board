import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from 'react-native-encrypted-storage';
import {persistReducer, persistStore} from 'redux-persist';
import themeSlice from '../reducerSlices/themeSlice';

const mainPersistConfig = {
  key: 'mainPersist',
  blacklist: ['isLoggedIn'],
  storage: AsyncStorage,
};
const reducers = combineReducers({
  darkMode: themeSlice,
});

const persistedReducer = persistReducer(mainPersistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: defaultMiddleWare =>
    defaultMiddleWare({
      serializableCheck: false,
    }).concat(),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
