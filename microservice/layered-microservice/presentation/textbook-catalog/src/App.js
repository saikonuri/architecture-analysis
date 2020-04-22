import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import UniversitiesPage from './components/UniversitiesPage';
import UniversityPage from './components/UniversityPage';
import DepartmentPage from './components/DepartmentPage';
import CoursePage from './components/CoursePage';
import TextbookPage from './components/TextbookPage';
import TextbookForm from './components/TextbookForm';
import OrderPage from './components/OrderPage.js';
import OrdersPage from './components/OrdersPage.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/universities">
          <UniversitiesPage />
        </Route>
        <Route exact path="/universities/:id">
          <UniversityPage />
        </Route>
        <Route exact path="/departments/:id">
          <DepartmentPage />
        </Route>
        <Route exact path="/courses/:id">
          <CoursePage />
        </Route>
        <Route exact path="/textbooks/:id">
          <TextbookPage />
        </Route>
        <Route exact path="/textbook/order">
          <TextbookForm />
        </Route>
        <Route exact path="/orders/:id">
          <OrderPage />
        </Route>
        <Route exact path="/orders">
          <OrdersPage />
        </Route>
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div className="App">
      <h1>
        Textbook Catalog
        </h1>
      <br />
      <Link to='/universities' id="universities-page-link"> Universities>> </Link>
    </div>
  );
}


export default App;
