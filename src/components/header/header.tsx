import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { IClientResponse } from '../../services/petshopService';
import { addClient } from '../../store/clientSlice';
import { Button } from 'antd';
import { getId } from '../../utils';

const Header = () => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const createNewClient = () => {
    const id = getId();
    const newClientData: IClientResponse = {
      reportIds: [],
      id,
      name: `Client ${id}`,
    };
    dispatch(addClient(newClientData));
  };

  return (
    <>
      <Button type="primary" onClick={createNewClient}>
        New Client
      </Button>
      <form>
        <input placeholder="Client search" />
      </form>
    </>
  );
};

export default Header;
