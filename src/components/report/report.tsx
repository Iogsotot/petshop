import styles from './report.module.scss';

export interface IReport {
  data: {};
}

const Report = (data: IReport) => {
  return <div className={styles.root}>data:</div>;
};

export default Report;
