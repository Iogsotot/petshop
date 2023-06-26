import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import Client, { IClient } from '../client/client';
import { deleteClient } from '../../store/clientSlice';

interface IClientsList {
  clients: IClient[];
}

const ClientsList = ({ clients }: IClientsList) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleDeleteClient = (clientId: string) => {
    console.log(`delete Client ${clientId}`);
    dispatch(deleteClient(clientId));
  };

  return (
    <div>
      {clients.map((client) => (
        <Client
          key={client.id}
          client={client}
          onDelete={() => handleDeleteClient(client.id)}
        />
      ))}
    </div>
  );
};

export default ClientsList;
