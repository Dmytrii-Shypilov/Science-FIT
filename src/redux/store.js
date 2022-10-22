import { configureStore, combineReducers } from '@reduxjs/toolkit';
import trainingsReducer from './trainings/trainings-slice';
import scheduleReducer from './schedule/schedule-slice';
import exercisesReducer from './exercises/exercises-slice';
import userReducer from './user/user-slice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['token', 'email'],
};

const persReducer = persistReducer(persistConfig, userReducer);

const reducer = combineReducers({
  schedule: scheduleReducer,
  trainings: trainingsReducer,
  exercises: exercisesReducer,
  user: persReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
});

export const persistore = persistStore(store);
setupListeners(store.dispatch);
