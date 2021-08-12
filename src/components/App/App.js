import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Forecast from 'domain/WeatherInfo';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    if (typeof window.Appcues !== 'undefined') {
      window.Appcues.identify(Math.random(), {
        created_at: Date.now(),
        user: `user_${Math.random() * 10}`,
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
