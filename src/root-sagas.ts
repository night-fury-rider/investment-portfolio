import { uvPieSaga } from './uv-pie/uv-pie-saga';
import { SagaMiddleware } from 'redux-saga';

const sagas = [uvPieSaga];

export function runAllSaga(middleware: SagaMiddleware) {
  for(const saga of sagas) {
    middleware.run(saga);
  }
}
