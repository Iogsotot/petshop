import React, { ReactNode } from 'react';
import styles from './collapsedBlock.module.scss';
import { Button, Collapse } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface CollapsedBlockProps {
  label: string;
  onDelete: () => void;
  children?: ReactNode; // Keep the children prop
}

const CollapsedBlock = ({ label, onDelete, children }: CollapsedBlockProps) => (
  <div className={styles.root}>
    <Button
      type="primary"
      icon={<CloseOutlined />}
      onClick={onDelete}
      className={styles['close-btn']}
    />
    <Collapse items={[{ key: label, label: label, children }]} />{' '}
  </div>
);

export default CollapsedBlock;
