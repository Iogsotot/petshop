import { CloseOutlined } from '@ant-design/icons';
import CollapsedBlock from '../collapsedBlock/collapsedBlock';
import { Button } from 'antd';
import styles from './report.module.scss';

export type TData = {
  id: string;
  type: string;
  value: string;
};
export interface IReport {
  id: string;
  data: TData[];
  clientId: string;
}

export type ReportsHash = { [key: string]: IReport };

interface ReportProps {
  report: IReport;
  onDeleteReport: () => void;
  onDeleteData: (dataId: string, reportId: string) => void;
}

const Report = ({ report, onDeleteReport, onDeleteData }: ReportProps) => {
  const { id, data } = report;
  return (
    <CollapsedBlock label={`Report #${id}`} onDelete={onDeleteReport}>
      {data.map((dataItem) => (
        <div key={dataItem.id} className={styles.datum}>
          <Button
            type="primary"
            shape="circle"
            size="small"
            icon={<CloseOutlined />}
            onClick={() => onDeleteData(dataItem.id, id)}
            className={styles['close-btn']}
          />
          {dataItem.value}
        </div>
      ))}
    </CollapsedBlock>
  );
};

export default Report;
