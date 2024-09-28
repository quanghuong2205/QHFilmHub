'use client';

import { useMovieDetail } from '@/services/useMovie';
import MovieDetail from './detail';
import PageLoading from '@/components/page-loading';

function MovieDetailPage({ params: { slug } }: { params: { slug: string } }) {
  const { isLoading, data } = useMovieDetail(slug);

  if (isLoading) {
    return <PageLoading content='Đang tải thông tin chi tiết...' />;
  }
  console.log(data);
  return <MovieDetail movie={data!} />;
}

export default MovieDetailPage;
