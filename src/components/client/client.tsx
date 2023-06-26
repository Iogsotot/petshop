import React from 'react';
import styles from './client.module.scss';
import { IReport } from '../report/report';
import PetshopService from '../../services/petshopService';

export interface IClient {
  id: string;
  name: string;
  reports: IReport[];
}

interface ClientProps {
  client: IClient;
}

const Client = ({ client }: ClientProps) => {
  const { id, name } = client;
  const service = new PetshopService();

  const deleteClient = (id: string) => {
    console.log(`delete Client ${id}`);
    service.deleteClient(id);
    // TODO: add refetch clients after creation new client
  };
  return (
    <div className={styles.root}>
      <button onClick={() => deleteClient(id)}>X</button>
      {name}
    </div>
  );
};

export default Client;
