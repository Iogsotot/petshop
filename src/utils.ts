import { IReport, ReportsHash } from './components/report/report';
import { IReportResponse } from './services/petshopService';

// synthetic function to create id
export const getId = () => {
  return Date.now().toString().split('').splice(3).join('');
};

export const convertReports = (reports: IReportResponse[]): ReportsHash =>
  reports.reduce<{ [key: string]: IReport }>((acc, report) => {
    const { id, clientId, data } = report;
    acc[id] = { id, data, clientId };
    return acc;
  }, {});
