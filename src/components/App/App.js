import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Forecast from 'domain/WeatherInfo';

const App = () => (<div>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Forecast} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
