import { authSaga } from 'features/auth/authSaga';
import { drugSaga } from 'features/categories/drug/drugSaga';
import { keyPopulationSaga } from 'features/categories/keyPopulations/keyPopulationSaga';
import { genderSaga } from 'features/categories/gender/genderSaga';

import { all } from 'redux-saga/effects';
import { customerSaga } from 'features/customers/customerSaga';
import { prepSaga } from 'features/customerHistories/prep/prepSaga';
import { testingSaga } from 'features/customerHistories/testing/testingSaga';
import { reportSaga } from 'features/report/reportSaga';
import { ageGroupSaga } from 'features/categories/ageGroup/ageGroupSaga';
import { siteSaga } from 'features/categories/site/siteSaga';
import { districtsSaga } from 'features/categories/districts/districtsSaga';
import provinceSaga from 'features/categories/province/provinceSaga';
import { drugHistorySaga } from 'features/drugHistory/drugHistorySaga';
import { artSaga } from 'features/customerHistories/art/artSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    reportSaga(),
    testingSaga(),
    prepSaga(),
    artSaga(),
    customerSaga(),
    drugSaga(),
    keyPopulationSaga(),
    genderSaga(),
    ageGroupSaga(),
    siteSaga(),
    districtsSaga(),
    provinceSaga(),
    drugHistorySaga(),
    // drugHistorySaga(),
  ]);
}
