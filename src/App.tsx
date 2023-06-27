import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClientsList from './components/clientList/clientsList';
import Header from './components/header/header';

import { AppDispatch, selectClients } from './store/store';
import { fetchClients } from './store/clientSlice';
import { fetchReports } from './store/reportSlice';
import styles from './App.module.scss';

function App() {
  const clients = useSelector(selectClients);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchClients());
  }, []);

  useEffect(() => {
    dispatch(fetchReports());
  }, []);

  return (
    <div className={styles.App}>
      <Header />
      <main>
        main:
        <ClientsList isLoading={clients.loading} clients={clients.data} />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
