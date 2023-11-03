'use client';

import useAuthModal from '@/hooks/use-auth-modal';
import useDietScheduleModal from '@/hooks/use-diet-schedule-modal';
import { useUser } from '@/hooks/use-user';

import Modal from './modal';

const DietScheduleModal = () => {
  const { isOpen, onClose } = useDietScheduleModal();
  const authModal = useAuthModal();
  const { user } = useUser();

  return (
    <Modal
      title="Diet"
      description="Add your desire food menu to your plan"
      isOpen={isOpen}
      onChange={onClose}
    >
      DietScheduleModal
    </Modal>
  );
};

export default DietScheduleModal;
