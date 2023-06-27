import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { IClientResponse } from '../../services/petshopService';
import { addClient } from '../../store/clientSlice';
import { Button } from 'antd';
import { getId } from '../../utils';
import { Input } from 'antd';
import styles from './header.module.scss';

const { Search } = Input;

type HeaderProps = {
  onSearch: (value: string) => void;
};

const Header = ({ onSearch }: HeaderProps) => {
  const dispatch: AppDispatch = useDispatch();

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
    <div className={styles.root}>
      <Button type="primary" onClick={createNewClient}>
        New Client
      </Button>

      <Search
        placeholder="Client search"
        onSearch={onSearch}
        className={styles.search}
      />
    </div>
  );
};

export default Header;
