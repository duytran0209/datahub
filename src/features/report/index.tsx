import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CalculateReportPage } from './pages/CalculateReportPage';
import { DetailPage } from './pages/DetailPage';
import ListPage from './pages/ListPage';

export default function ReportFeature() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/calculate`} exact>
        <CalculateReportPage />
      </Route>
      <Route path={`${match.path}/detail/:id`} exact>
        <DetailPage />
      </Route>
    </Switch>
  );
}
