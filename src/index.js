import React from 'react';
import {render} from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import RepoIssuesApp from './RepoIssues';
import NotFound from './NotFound';
import './App.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <HashRouter>
    <div>
      <Switch>
        <Route exact path="/" component={RepoIssuesApp} />
        <Route path="/issue/:issueId" component={RepoIssuesApp} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </HashRouter>
);

render(<App />, document.getElementById('root'));
registerServiceWorker();
