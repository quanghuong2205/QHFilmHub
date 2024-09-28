'use client';
import styles from './styles.module.scss';
import Search from '@/Icon/Search';
import { ChangeEvent, useRef, useState } from 'react';
import X from '@/Icon/X';
import SearchResult from './result';
import { Tooltip } from 'react-tooltip';
import debounce from '@/utils/debounce';
import CustomImage from '../custom-image';

function MovieSearch() {
  const [query, setQuery] = useState<string>('');
  const toolTipRef = useRef(null);

  /* Handlet set query string */
  const handleSearch = debounce(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (e?.target as HTMLInputElement).value;
      setQuery(value);
    },
    1000,
    false,
  );

  return (
    <div className={styles['search-wrapper']}>
      <div
        className={styles['search']}
        data-tooltip-id='movie-search'>
        <div className={styles['search-icon']}>
          <Search
            width={18}
            height={18}
          />
        </div>
        <button className={styles['search-close']}>
          <X />
        </button>
        <input
          type='text'
          placeholder='Search...'
          onChange={handleSearch}
        />
      </div>

      <Tooltip
        clickable
        id='movie-search'
        place='bottom-start'
        offset={14}
        style={{ padding: 0, borderRadius: 10 }}
        noArrow
        openOnClick
        ref={toolTipRef}>
        <div className={styles['search-result']}>
          {query ? (
            <SearchResult
              query={query}
              tooltipRef={toolTipRef}
            />
          ) : (
            <div className={styles['search-empty']}>
              <CustomImage
                src={'/img/no-search-found.webp'}
                alt='not found'
                objectFit='contain'
              />
            </div>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default MovieSearch;
