import { takeEvery, put } from 'redux-saga/effects';
import UV_PIE from './uv-pie-constants';
import UV_BAR_CHART from './../uv-bar-chart/uv-bar-chart-constants';
import UvPieAction from './uv-pie-action-interface';

function* selectSlice(selectedSlice: UvPieAction) {
  yield put({
    type: UV_BAR_CHART.LOAD,
    parentIndex: selectedSlice.sliceIndex
  });
}

export function* uvPieSaga() {
  yield takeEvery(UV_PIE.SELECT_SLICE, selectSlice);
}
