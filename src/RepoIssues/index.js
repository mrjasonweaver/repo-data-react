/** 
 * Top level container for RepoIssues module 
 */

 import React from 'react';
 import store from './storeConfig';
 import {Provider} from 'react-redux';
 import Main from './containers';

 export default class RepoIssuesApp extends React.PureComponent {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
 }