import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

export default function DrugHistoryFeature() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/:id`}>
        <DetailPage />
      </Route>
    </Switch>
  );
}
