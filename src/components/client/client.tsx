import React from 'react';
// import styles from './client.module.scss';
import CollapsedBlock from '../collapsedBlock/collapsedBlock';
import Report, { IReport } from '../report/report';
import { Button } from 'antd';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IReportResponse } from '../../services/petshopService';
import { addReport, deleteData, deleteReport } from '../../store/reportSlice';
import { getId } from '../../utils';
import { RootState } from '../../types';

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
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const reports = useSelector((state: RootState) =>
    Object.values(state.reports).filter((report) => report.clientId === id)
  );

  const handleDeleteReport = (reportId: string) => {
    dispatch(deleteReport(reportId));
  };
  const onDeleteData = (dataId: string, reportId: string) => {
    dispatch(deleteData({ dataId, reportId }));
  };

  const createNewReport = () => {
    const reportId = getId();
    const newReport: IReportResponse = {
      id: `r-${reportId}`,
      data: [],
      clientId: id,
    };
    dispatch(addReport(newReport));
  };

  return (
    <CollapsedBlock label={name} onDelete={onDeleteClient}>
      <p>Client #{id} reports</p>
      <Button type="primary" onClick={createNewReport}>
        Add report
      </Button>
      {reports.map((report: IReport) => (
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
