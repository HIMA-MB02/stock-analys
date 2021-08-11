import React from 'react';
import { NavigationBar } from './components';
import { Provider } from 'react-redux';
import { store } from './redux';
import Routes from './routes/Routes';

function App() {
  return (
    <Provider store={store}>
      <NavigationBar />
      <Routes />
    </Provider>
  );
}

export default App;
