import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Forecast from 'domain/WeatherInfo';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    if (typeof window.Appcues !== 'undefined') {
      window.Appcues.identify(Math.floor(Math.random()), {
        created_at: Date.now(),
        first_name: `first_${Math.floor(Math.random() * 10)}`,
        last_name: `last_${Math.floor(Math.random() * 10)}`,
      });
    }
  }, []);

  useEffect(() => {
    if (!history) return;
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      if (typeof window.Appcues !== 'undefined') {
        window.Appcues.page();
      }
    });
  }, [history]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Forecast} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
