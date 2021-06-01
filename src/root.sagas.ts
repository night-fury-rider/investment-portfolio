import { SagaMiddleware } from 'redux-saga';

import { UVDashboardSaga } from './modules/uv_dashboard/uv_dashboard.saga';

const sagas = [UVDashboardSaga];

export const runAllSaga = (middleware: SagaMiddleware) => {
  for(const saga of sagas) {
    middleware.run(saga);
  }
}
