import React, { ReactNode } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

interface ModalRouteProps {
  children: ReactNode | ((props: { onClose: () => void }) => ReactNode);
}

export default function ModalRoute({ children }: ModalRouteProps) {
  const navigate = useNavigate();

  // If children is a function, pass onClose as a prop
  const content = typeof children === 'function'
    ? children({ onClose: () => navigate(-1) })
    : children;

  return (
    <Modal
      isOpen={true}
      onClose={() => navigate(-1)}
      type="bottom"
      hideFooter
    >
      {content}
    </Modal>
  );
} 