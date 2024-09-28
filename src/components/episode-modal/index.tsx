'use client';
import { useEpisodeModalStore } from '@/store/useEpisodeModal';
import Modal from '../modal';
import MainEpisodeModal from './modal';

function EpisodeModal() {
  const { isOpen, closeModal, movieSlug } = useEpisodeModalStore();
  return (
    <Modal
      isOpen={isOpen}
      width={'700px'}
      maxHeight='65vh'
      onClose={closeModal}
      zIndex={11}>
      <MainEpisodeModal
        movieSlug={movieSlug}
        closeModal={closeModal}
      />
    </Modal>
  );
}

export default EpisodeModal;
