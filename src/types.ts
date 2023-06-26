import { IClient } from './components/client/client';
import { ReportsHash } from './components/report/report';

export type RootState = {
  reports: ReportsHash;
  clients: IClient[];
};
