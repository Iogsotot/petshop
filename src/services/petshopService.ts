import { IClient } from '../components/client/client';
import { IReport } from '../components/report/report';

interface IPetshopService {
  getClients: () => Promise<IClient[]>;
  createClient: (id: number, name: string, reportIds: number[]) => Promise<IClient>;
  deleteClient: (clientId: number) => Promise<void>;
  getReports: () => Promise<IReport[]>;
  createReport: (reportId: number) => Promise<IReport>;
  deleteReport: (reportId: number) => Promise<void>;
}

export default class PetshopService implements IPetshopService {
  private apiBase = 'http://localhost:3001/';

  private handleResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  getClients = async () => {
    const response = await fetch(`${this.apiBase}clients`);
    const clients = await this.handleResponse(response);
    return clients;
  };

  createClient = async (clientId: number) => {
    const response = await fetch(`${this.apiBase}clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: clientId }),
    });
    const createdClient = await this.handleResponse(response);
    return createdClient;
  };

  deleteClient = async (clientId: number) => {
    await fetch(`${this.apiBase}clients/${clientId}`, {
      method: 'DELETE',
    });
  };

  getReports = async () => {
    const response = await fetch(`${this.apiBase}reports`);
    const reports = await this.handleResponse(response);
    return reports;
  };

  createReport = async (reportId: number) => {
    const response = await fetch(`${this.apiBase}reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: reportId }),
    });
    const createdReport = await this.handleResponse(response);
    return createdReport;
  };

  deleteReport = async (reportId: number) => {
    await fetch(`${this.apiBase}reports/${reportId}`, {
      method: 'DELETE',
    });
  };
}
