import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Client, { IClient } from '../client/client';
import { deleteClient } from '../../store/clientSlice';

import styles from './clientList.module.scss';
import { Spin } from 'antd';

interface IClientsList {
  isLoading: boolean;
  clients: IClient[];
}

const ClientsList = ({ isLoading, clients }: IClientsList) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleDeleteClient = (clientId: string) => {
    dispatch(deleteClient(clientId));
  };

  if (isLoading) return <Spin />;

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
