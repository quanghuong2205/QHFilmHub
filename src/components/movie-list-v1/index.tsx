'use client';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useMoviesByType } from '@/services/useMovie';
import classNames from 'classnames';
import { createRandomArray } from '../../utils/randomArray';
import ExpanableMovieCard from '../movie-expandable-card';
import Skeleton from '../movie-expandable-card/skeleton';
import List from './list';

interface MovieListV1Props {
  title: string;
  type: string;
  limit?: number;
}

function MovieListV1({ title, type, limit }: MovieListV1Props) {
  const LIMIT = limit ?? 5;
  const { data, isLoading } = useMoviesByType(type, 1, LIMIT || 5);

  return (
    <div className={styles['list']}>
      <div className={styles['list-title']}>
        <h3>{title}</h3>
      </div>

      <List
        isLoading={isLoading}
        limit={LIMIT}
        movies={data?.movies}
      />
    </div>
  );
}

export default MovieListV1;
