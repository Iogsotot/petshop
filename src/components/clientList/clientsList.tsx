import React from 'react';
import Client, { IClient } from '../client/client';

interface IClientsList {
  clients: IClient[];
}

const ClientList = ({ clients }: IClientsList) => {
  return (
    <div>
      {clients.map((client) => (
        <Client key={client.id} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
