import React from 'react';
import styles from './client.module.scss';

export interface IClient {
  id: string;
  name: string;
}

interface ClientProps {
  client: IClient;
  onDelete: () => void;
}

const Client = ({ client, onDelete }: ClientProps) => {
  const { name } = client;

  return (
    <div className={styles.root}>
      <button onClick={onDelete}>X</button>
      {name}
    </div>
  );
};

export default Client;
