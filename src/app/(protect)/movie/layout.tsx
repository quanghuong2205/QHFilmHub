'use client';
import EpisodeModal from '@/components/episode-modal';
import MovieModal from '@/components/movie-modal';
import MainLayout from '@/layouts/main-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <EpisodeModal />
      <MovieModal />
      {children}
    </MainLayout>
  );
}
