import { IClient } from '../components/client/client';
import { IReport } from '../components/report/report';

interface IPetshopService {
  getClients: () => Promise<IClient[]>;
  createClient: (data: IClientResponse) => Promise<IClient>;
  deleteClient: (clientId: string) => Promise<void>;
  getReports: () => Promise<IReport[]>;
  createReport: (data: IReportResponse) => Promise<IReportResponse>;
  deleteReport: (reportId: string) => Promise<void>;
  deleteData: (reportId: string, dataId: string) => Promise<void>;
}

export interface IClientResponse extends Omit<IClient, 'reports'> {
  reportIds: string[];
}

export interface IReportResponse extends IReport {
  clientId: string;
}

export default class PetshopService implements IPetshopService {
  private apiBase = 'http://localhost:3001/';

  private handleResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  getClients = async (): Promise<IClientResponse[]> => {
    const response = await fetch(`${this.apiBase}clients`);
    const clients: IClientResponse[] = await this.handleResponse(response);
    return clients;
  };

  createClient = async (data: IClientResponse) => {
    const response = await fetch(`${this.apiBase}clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const createdClient = await this.handleResponse(response);
    return createdClient;
  };

  deleteClient = async (clientId: string) => {
    await fetch(`${this.apiBase}clients/${clientId}`, {
      method: 'DELETE',
    });
  };

  getReports = async () => {
    const response = await fetch(`${this.apiBase}reports`);
    const reports = await this.handleResponse(response);
    return reports;
  };

  createReport = async (data: IReportResponse) => {
    const response = await fetch(`${this.apiBase}reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const createdReport = await this.handleResponse(response);
    return createdReport;
  };

  deleteReport = async (reportId: string) => {
    await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'DELETE',
    });
  };

  deleteData = async (reportId: string, dataId: string) => {
    const response = await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reports: [
          {
            id: reportId,
            data: [{ id: dataId }],
          },
        ],
      }),
    });
    await this.handleResponse(response);
  };
}
