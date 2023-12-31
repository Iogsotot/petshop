import { IClient } from '../components/client/client';
import { IReport, TData } from '../components/report/report';

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
    const createdReport: IReportResponse = await this.handleResponse(response);

    const clientResponse = await fetch(
      `${this.apiBase}clients/${data.clientId}`
    );
    const client: IClientResponse = await this.handleResponse(clientResponse);

    client.reportIds.push(createdReport.id);

    const updateClientResponse = await fetch(
      `${this.apiBase}clients/${data.clientId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      }
    );

    await this.handleResponse(updateClientResponse);

    return createdReport;
  };

  deleteReport = async (reportId: string) => {
    await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'DELETE',
    });
  };

  addDataItem = async (reportId: string, newData: TData): Promise<void> => {
    const response = await fetch(`${this.apiBase}reports/${reportId}`);
    const report: IReport = await this.handleResponse(response);

    report.data.push(newData);

    const updateResponse = await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    await this.handleResponse(updateResponse);
  };

  deleteData = async (reportId: string, dataId: string) => {
    const response = await fetch(`${this.apiBase}reports/${reportId}`);
    const report = await this.handleResponse(response);

    report.data = report.data.filter((data: TData) => data.id !== dataId);

    const updateResponse = await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });
    await this.handleResponse(updateResponse);
  };
}
