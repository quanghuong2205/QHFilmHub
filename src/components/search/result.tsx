import Link from 'next/link';
import CustomImage from '../custom-image';
import styles from './styles.module.scss';
import Search from '@/Icon/Search';
import { useMovieSearch } from '@/services/useMovie';

interface ISearchResultProps {
  query: string;
  tooltipRef: any;
}

function SearchResult({ query, tooltipRef }: ISearchResultProps) {
  const { isLoading, data } = useMovieSearch(query);
  return (
    <>
      <div className={styles['search-result__header']}>
        {isLoading ? (
          <div>
            <CustomImage
              src='/img/loading.png'
              alt='loading icon'
            />
          </div>
        ) : (
          <Search
            width={18}
            height={18}
          />
        )}

        <p>
          Kết quả tìm kiếm cho &apos;
          <span>{query}</span>&apos;
        </p>
      </div>

      <ul>
        {isLoading ? (
          <div className={styles['search-loading']}>
            <div>
              <CustomImage
                src={'/img/loading.png'}
                alt='loading'
              />
            </div>
          </div>
        ) : data?.length ? (
          data?.map((movie) => (
            <li
              className={styles['search-item']}
              key={movie.slug}>
              <Link
                href={`/detail/${movie.slug}`}
                onClick={() => tooltipRef?.current?.close()}>
                <div className={styles['search-item__image']}>
                  <CustomImage
                    src={movie.poster_url}
                    alt={movie.slug}
                  />
                </div>
                <div className={styles['search-item__content']}>
                  <span className='line-clamp'>{movie.name}</span>
                  <span>{movie.category.join(', ')}</span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div className={styles['search-empty']}>
            <CustomImage
              src={'/img/no-search-found.webp'}
              alt='not found'
              objectFit='contain'
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default SearchResult;
