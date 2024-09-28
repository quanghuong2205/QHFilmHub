import { useState } from 'react';
import Modal from '../modal';
import styles from './styles.module.scss';

interface ConfirmModalProps {
  message: string;
  desc?: string;
  onOK?: () => void;
  onCancel?: () => void;
  isOpen?: boolean;
}

function ConfirmModal({ message, desc, isOpen, onOK, onCancel }: ConfirmModalProps) {
  const [isShown, setIsShown] = useState(!!isOpen);

  const handleOK = () => {
    onOK?.();
    setIsShown(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsShown(false);
  };

  return (
    <Modal
      isOpen={isShown}
      onClose={() => setIsShown(false)}
      width={'400px'}
      iconSize={18}>
      <div className={styles['confirm-modal']}>
        <h4 className={styles['title']}>{message || 'No title'}</h4>
        <p className={styles['desc']}>{desc || 'No desc'}</p>
        <div className={styles['act']}>
          <button
            className='btn pri-btn'
            onClick={handleOK}>
            OK
          </button>
          <button
            className='btn outline-btn'
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
