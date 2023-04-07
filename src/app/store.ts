import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import provinceReducer from 'features/categories/province/provinceSlice';
import drugReducer from 'features/categories/drug/drugSlice';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';
import keyPopulationReducer from 'features/categories/keyPopulations/keyPopulationSlice';
import genderReducer from 'features/categories/gender/genderSlice';
import customerReducer from 'features/customers/customerSlice';
import prepReducer from 'features/customerHistories/prep/prepSlice';
import testingReducer from 'features/customerHistories/testing/testingSlice';
import reportReducer from 'features/report/reportSlice';
import ageGroupReducer from 'features/categories/ageGroup/ageGroupSlice';
import siteReducer from 'features/categories/site/siteSlice';
import districtsReducer from 'features/categories/districts/districtsSlice';
import drugHistoryReducer from 'features/drugHistory/drugHistorySlice';
import artReducer from 'features/customerHistories/art/artSlice';
import changePasswordReducer from '../features/auth/changePasswordSlice';

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  province: provinceReducer,
  drug: drugReducer,
  prep: prepReducer,
  art: artReducer,
  testing: testingReducer,
  customer: customerReducer,
  report: reportReducer,
  drugHistory: drugHistoryReducer,
  keyPopulation: keyPopulationReducer,
  gender: genderReducer,
  ageGroup: ageGroupReducer,
  site: siteReducer,
  districts: districtsReducer,
  changePassword: changePasswordReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
