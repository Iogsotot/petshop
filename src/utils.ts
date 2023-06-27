import { IReport, ReportsHash } from './components/report/report';
import { pictures } from './constants';
import { IReportResponse } from './services/petshopService';

// synthetic function to create id
export const getId = () => {
  // splice  here is used to reduce the length of the ID,
  // this does not affect the functionality within the test task
  return Date.now().toString().split('').splice(3).join('');
};

export const convertReports = (reports: IReportResponse[]): ReportsHash =>
  reports.reduce<{ [key: string]: IReport }>((acc, report) => {
    const { id, clientId, data } = report;
    acc[id] = { id, data, clientId };
    return acc;
  }, {});

export const getDataType = (): string => {
  //TODO: implement random from dataTypes[]
  return 'picture';
};

export const getDataValue = (arr: string[] = pictures): string => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
