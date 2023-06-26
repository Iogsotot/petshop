import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { IClientResponse } from '../../services/petshopService';
import { addClient } from '../../store/clientSlice';

const getId = () => {
  return Date.now().toString();
};

const Header = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const createNewClient = () => {
    const id = getId();
    const newClientData: IClientResponse = {
      reportIds: [],
      id,
      name: `Client ${id}`,
    };
    console.log('create btn clicked: ', id);
    dispatch(addClient(newClientData));
  };

  return (
    <>
      <button onClick={createNewClient}>New Client</button>

      <form>
        <input placeholder="Client search" />
      </form>
    </>
  );
};

export default Header;
