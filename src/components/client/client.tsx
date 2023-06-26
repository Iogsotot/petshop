import React from 'react';
import styles from './client.module.scss';
import CollapsedBlock from '../collapsedBlock/collapsedBlock';
import Report from '../report/report';

export interface IClient {
  id: string;
  name: string;
}

interface ClientProps {
  client: IClient;
  onDeleteClient: () => void;
}

const Client = ({ client, onDeleteClient }: ClientProps) => {
  const { name, id } = client;

  //TODO: del mock
  const reports = [
    {
      id: 'report 12',
      data: [
        { id: 'data 1', type: 'png', value: 'picture' },
        { id: 'data 2', type: 'png', value: 'picture' },
      ],
    },
    {
      id: 'report 13',
      data: [
        { id: 'data 1', type: 'png', value: 'grid' },
        { id: 'data 2', type: 'png', value: 'grid' },
      ],
    },
  ];

  const handleDeleteReport = (reportId: string) => {
    console.log('onDeleteReport: ', reportId);
  };
  const onDeleteData = (dataId: string) => {
    console.log('onDeleteData: ', dataId);
  };

  return (
    <CollapsedBlock label={name} onDelete={onDeleteClient}>
      <p>Client #{id} reports</p>
      {reports.map((report) => (
        <Report
          key={report.id}
          report={report}
          onDeleteReport={() => handleDeleteReport(report.id)}
          onDeleteData={onDeleteData}
        ></Report>
      ))}
    </CollapsedBlock>
  );
};

export default Client;
