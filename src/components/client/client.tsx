import CollapsedBlock from '../collapsedBlock/collapsedBlock';
import Report, { IReport, ReportsHash } from '../report/report';
import { Button, Empty, Spin } from 'antd';
import { AppDispatch, selectReports } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { IReportResponse } from '../../services/petshopService';
import { addReport, deleteData, deleteReport } from '../../store/reportSlice';
import { getId } from '../../utils';

import styles from './client.module.scss';

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

  const reportsResponse = useSelector(selectReports);
  const reports: ReportsHash = reportsResponse.data;
  const isLoading = reportsResponse.loading;

  const filteredReports: IReport[] = Object.values(reports).filter(
    (report) => report.clientId === id
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

  const reportsList = filteredReports.map((report: IReport) => (
    <Spin spinning={isLoading} key={`spin-${report.id}`}>
      <Report
        key={report.id}
        report={report}
        onDeleteReport={() => handleDeleteReport(report.id)}
        onDeleteData={onDeleteData}
      ></Report>
    </Spin>
  ));

  const reportsRender = filteredReports.length ? (
    reportsList
  ) : (
    <Empty description="no reports"></Empty>
  );

  return (
    <CollapsedBlock label={name} onDelete={onDeleteClient}>
      <p>Client #{id} reports</p>
      <Button type="primary" onClick={createNewReport} className={styles.btn}>
        Add report
      </Button>
      <Spin spinning={isLoading}>{reportsRender}</Spin>
    </CollapsedBlock>
  );
};

export default Client;
