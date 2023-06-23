import React from 'react';
import styles from './client.module.scss';
import { IReport } from '../report/report';
import PetshopService from '../../services/petshopService';

export interface IClient {
  id: number;
  name: string;
  reports: IReport[];
}

interface ClientProps {
  client: IClient;
}

const Client = ({ client }: ClientProps) => {
  const { id, name } = client;
  const service = new PetshopService

  // Пример использования
  const newClientData = {
    id: 16,
    name: 'Client 16',
    reportIds: [10, 11],
  };

  const deleteClient = (id: number) => {
    console.log(`delete Client ${id}`);
    console.log('asdasdasd');

    console.log('data: ', newClientData);
    console.log('11111');

    service.createClient(newClientData);
  };
  return (
    <div className={styles.root}>
      <button onClick={() => deleteClient(id)}>X</button>
      name {name}id: {id}
    </div>
  );
};

export default Client;
