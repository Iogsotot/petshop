import React, { useEffect, useState } from 'react';
import ClientsList from './components/clientList/clientsList';
import Header from './components/header/header';
import { IClient } from './components/client/client';
import styles from './App.module.scss';
import PetshopService from './services/petshopService';

function App() {
  const [clients, setClients] = useState<IClient[]>([]);
  const service = new PetshopService();

  useEffect(() => {
    const fetchClients = async () => {
      const fetchedClients = await service.getClients();
      setClients(fetchedClients);
    };

    fetchClients();
  }, []);

  return (
    <div className={styles.App}>
      <Header></Header>
      <main>
        main:
        <ClientsList clients={clients}></ClientsList>
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
