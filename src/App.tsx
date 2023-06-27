import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ClientsList from './components/clientList/clientsList';
import Header from './components/header/header';

import { AppDispatch, selectClients } from './store/store';
import {
  fetchClients,
  selectClientsSlice,
  setSearchValue,
} from './store/clientSlice';
import { fetchReports } from './store/reportSlice';
import styles from './App.module.scss';

function App() {
  const clientsSlice = useSelector(selectClientsSlice);
  const clients = useSelector(selectClients);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchReports());
  }, []);

  const onSearch = (value: string) => {
    console.log(value);
    dispatch(setSearchValue(value));
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name
        .toLowerCase()
        .includes(clientsSlice.searchValue.toLowerCase()) ||
      client.id.toLowerCase().includes(clientsSlice.searchValue.toLowerCase())
  );

  return (
    <div className={styles.App}>
      <Header onSearch={onSearch} />
      <main>
        <ClientsList
          isLoading={clientsSlice.loading}
          clients={filteredClients}
        />
      </main>
      <footer className={styles.footer}>Implemented by Anna Iustus</footer>
    </div>
  );
}

export default App;
