import ChevronDown from '@/Icon/ChevronDown';
import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

interface PaginateItemsProps {
  totalPages: number;
  onPageChane: (page: number) => void;
}

function PaginateItems({ totalPages, onPageChane }: PaginateItemsProps) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChane(selected);
  };

  return (
    <ReactPaginate
      breakLabel='...'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel={
        <button className={styles['pagi-back']}>
          <ChevronDown />
        </button>
      }
      nextLabel={
        <button className={styles['pagi-next']}>
          <ChevronDown />
        </button>
      }
      pageLinkClassName={styles['pagi-link']}
      previousClassName={styles['pagi-link']}
      nextClassName={styles['pagi-next']}
      activeClassName={styles['pagi-active']}
      containerClassName={styles['pagi']}
      renderOnZeroPageCount={null}
    />
  );
}

export default PaginateItems;
