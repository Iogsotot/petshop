import { ReactNode } from 'react';
import { Button, Collapse } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import styles from './collapsedBlock.module.scss';

interface CollapsedBlockProps {
  label: string;
  onDelete: () => void;
  children?: ReactNode;
}

const CollapsedBlock = ({ label, onDelete, children }: CollapsedBlockProps) => (
  <div className={styles.root}>
    <Button
      type="primary"
      icon={<CloseOutlined />}
      onClick={onDelete}
      className={styles['close-btn']}
    />
    <Collapse items={[{ key: label, label: label, children }]} />
  </div>
);

export default CollapsedBlock;
