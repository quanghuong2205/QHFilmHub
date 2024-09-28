'use client';
import { useMovieModalStore } from '@/store/useMovieModal';
import Modal from '../modal';
import MainMovieModal from './modal';

function MovieModal() {
  const { isOpen, closeModal } = useMovieModalStore();
  return (
    <Modal
      isOpen={isOpen}
      width={'1000px'}
      maxHeight='80vh'
      onClose={closeModal}>
      <MainMovieModal />
    </Modal>
  );
}

export default MovieModal;
