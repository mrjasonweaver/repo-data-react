import main from './main';

export default function* rootSaga() {
  yield [
    ...main
  ];
}