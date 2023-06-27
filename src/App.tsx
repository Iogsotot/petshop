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
import { GithubOutlined } from '@ant-design/icons';
import { Divider, Layout } from 'antd';

const { Footer } = Layout;

function App() {
  const clientsSlice = useSelector(selectClientsSlice);
  const clients = useSelector(selectClients);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
    dispatch(fetchReports());
  }, []);

  const onSearch = (value: string) => {
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
      <main className={styles.main}>
        <ClientsList
          isLoading={clientsSlice.loading}
          clients={filteredClients}
        />
      </main>

      <Footer className={styles.footer}>
        Implemented by{' '}
        <a href="https://telescope.epam.com/who/Anna_Iustus?tab=profile">
          Anna Iustus
        </a>
        <Divider type="vertical" />
        <a href="https://github.com/Iogsotot">
          <GithubOutlined />
        </a>
      </Footer>
    </div>
  );
}

export default App;
