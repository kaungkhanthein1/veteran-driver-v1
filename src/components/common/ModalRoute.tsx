import React, { ReactNode } from 'react';
import Modal from './Modal';
import { useNavigate, useLocation } from 'react-router-dom';

interface ModalRouteProps {
  children: ReactNode | ((props: { onClose: () => void }) => ReactNode);
}

export default function ModalRoute({ children }: ModalRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    if (background) {
      // If we have a background location, navigate to it
      navigate(background.pathname, { replace: true });
    } else {
      // If no background, just close the modal
      navigate(-1);
    }
  };

  // If children is a function, pass onClose as a prop
  const content = typeof children === 'function'
    ? children({ onClose: handleClose })
    : React.cloneElement(children as React.ReactElement, { onClose: handleClose });

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      type="bottom"
      hideFooter
    >
      {content}
    </Modal>
  );
} 