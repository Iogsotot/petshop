import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClientsList from './components/clientList/clientsList';
import Header from './components/header/header';

import { AppDispatch } from './store/store';
import { RootState } from './types';
import styles from './App.module.scss';
import { fetchClients } from './store/clientSlice';
import { fetchReports } from './store/reportSlice';

function App() {
  const clients = useSelector((state: RootState) => state.clients);
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
        <ClientsList clients={clients} />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
