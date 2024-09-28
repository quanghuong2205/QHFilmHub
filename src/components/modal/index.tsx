'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';
import X from '@/Icon/X';
import { listenEvent } from '@/utils/event';

interface ModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
  width?: string;
  height?: string;
  maxHeight?: string;
  iconSize?: number;
  zIndex?: number;
}

function Modal({
  children,
  onClose,
  isOpen,
  width,
  height,
  iconSize,
  maxHeight,
  zIndex,
}: ModalProps) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.querySelector('body');
  }, []);

  useEffect(() => {
    if (isOpen) {
      bodyRef.current?.style.setProperty('overflow', 'hidden');
    } else {
      bodyRef.current?.style.setProperty('overflow', 'auto');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div
      className={classNames({
        [styles['modal']]: true,
      })}
      style={{
        zIndex: zIndex ?? 10,
      }}>
      <div
        className={classNames({
          [styles['modal-inner']]: true,
        })}
        style={{
          width: `min(100%, ${width ?? '800px'})`,
        }}>
        <button
          className={styles['modal-close']}
          onClick={onClose}>
          <X
            width={iconSize}
            height={iconSize}
          />
        </button>
        <div
          className={styles['modal-content']}
          style={{
            minHeight: height ?? 'auto',
            maxHeight: maxHeight ?? ' 100vh',
          }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
