import CollapsedBlock from '../collapsedBlock/collapsedBlock';
import { Button } from 'antd';
import { getId, getDataType, getDataValue } from '../../utils';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { addData } from '../../store/reportSlice';

import { CloseOutlined } from '@ant-design/icons';
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

export interface IReportData {
  reportId: string;
  newData: TData;
}

interface ReportProps {
  report: IReport;
  onDeleteReport: () => void;
  onDeleteData: (dataId: string, reportId: string) => void;
}

const Report = ({ report, onDeleteReport, onDeleteData }: ReportProps) => {
  const { id, data } = report;
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const createNewData = () => {
    const dataId = getId();
    const dataType = getDataType();
    const dataValue = getDataValue();
    const newDataItem: TData = {
      id: `d-${dataId}`,
      type: dataType,
      value: dataValue,
    };
    dispatch(addData({ reportId: id, newData: newDataItem }));
  };

  return (
    <CollapsedBlock label={`Report #${id}`} onDelete={onDeleteReport}>
      <p>Report #{id} data</p>
      <Button type="primary" onClick={createNewData}>
        Add data
      </Button>
      <div className={styles.dataItems}>
        {data.map((dataItem) => (
          <div key={dataItem.id} className={styles.dataItem}>
            <Button
              type="primary"
              shape="circle"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => onDeleteData(dataItem.id, id)}
              className={styles['close-btn']}
            />
            <div className={styles.dataView}>
              <img src={`/img/${dataItem.value}`}></img>
            </div>
          </div>
        ))}
      </div>
    </CollapsedBlock>
  );
};

export default Report;
