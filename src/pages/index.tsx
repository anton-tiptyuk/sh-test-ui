import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { ROUTE_UPLOAD, ROUTE_VIDEOS } from '../common/routes';
import Videos from './videos';
import Upload from './upload';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar>
            <LinkContainer to={ROUTE_VIDEOS}>
              <Nav.Link>videos</Nav.Link>
            </LinkContainer>
            <LinkContainer to={ROUTE_UPLOAD}>
              <Nav.Link>upload</Nav.Link>
            </LinkContainer>
          </Navbar>
        </header>

        <Switch>
          <Route path={ROUTE_VIDEOS} component={Videos} />
          <Route path={ROUTE_UPLOAD} component={Upload} />
          <Redirect from='/' to={ROUTE_UPLOAD} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
