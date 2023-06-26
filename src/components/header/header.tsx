import React from 'react';
import PetshopService, { IClientResponse } from '../../services/petshopService';
// import styles from './header.module.scss';

const getId = () => {
  return Date.now().toString();
};

const Header = () => {
  const service: PetshopService = new PetshopService();

  const createNewClient = () => {
    const id = getId();
    const newClientData: IClientResponse = {
      reportIds: [],
      id,
      name: `Client ${id}`,
    };
    console.log('create btn clicked: ', id);
    service.createClient(newClientData);
    // TODO: add refetch clients after creation new client
  };

  return (
    <>
      <button onClick={createNewClient}>New Client</button>

      <form>
        <input
          placeholder="Client search"
          // value={} onChange={ }
        />
      </form>
    </>
  );
};

export default Header;
