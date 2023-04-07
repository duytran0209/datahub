import CustomerFeature from 'features/customers';
import DrugFeature from 'features/categories/drug';
import DrugHistoryFeature from 'features/drugHistory';
import GenderFeature from 'features/categories/gender';
import KeyPopulationFeature from 'features/categories/keyPopulations';
import PrEPFeature from 'features/customerHistories/prep';
import TestingFeature from 'features/customerHistories/testing';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ARTFeature from 'features/customerHistories/art';
import ReportFeature from 'features/report';
import ProvincesFeature from '../../features/categories/province/index';

export function AppRoutes() {
  return (
    <Switch>
      <Route path="/provinces">
        <ProvincesFeature />
      </Route>
      <Route path="/drugs">
        <DrugFeature />
      </Route>
      <Route path="/drug-histories">
        <DrugHistoryFeature />
      </Route>
      <Route path="/client">
        <CustomerFeature />
      </Route>
      <Route path="/prep">
        <PrEPFeature />
      </Route>
      <Route path="/art">
        <ARTFeature />
      </Route>
      <Route path="/testing">
        <TestingFeature />
      </Route>
      <Route path="/key-populations">
        <KeyPopulationFeature />
      </Route>
      <Route path="/genders">
        <GenderFeature />
      </Route>
      <Route path="/report">
        <ReportFeature />
      </Route>
    </Switch>
  );
}
