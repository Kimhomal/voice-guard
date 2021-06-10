import React from 'react';
import Signin from './components/user/signin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Guard from './components/guard/guard';
import Header from './components/header/header';

const App = ({ authService }: { authService: any }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Signin authService={authService}></Signin>
        </Route>
      </Switch>
      <Switch>
        <Route exact path="/guard">
          <Header></Header>
          <Guard></Guard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
