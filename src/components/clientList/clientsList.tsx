import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Client, { IClient } from '../client/client';
import { deleteClient } from '../../store/clientSlice';

import styles from './clientList.module.scss';

interface IClientsList {
  clients: IClient[];
}

const ClientsList = ({ clients }: IClientsList) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleDeleteClient = (clientId: string) => {
    dispatch(deleteClient(clientId));
  };

  return (
    <div className={styles.root}>
      {clients.map((client) => (
        <Client
          key={client.id}
          client={client}
          onDeleteClient={() => handleDeleteClient(client.id)}
        />
      ))}
    </div>
  );
};

export default ClientsList;
