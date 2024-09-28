'use client';
import MainLayout from '@/layouts/main-layout';
import styles from './styles.module.scss';
import PageLoading from '@/components/page-loading';

function Test() {
  return (
    <MainLayout>
      <div className={styles['test']}>{/* <PageLoading /> */}</div>
    </MainLayout>
  );
}

export default Test;
