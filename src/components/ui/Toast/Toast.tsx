import { useEffect, useRef } from 'react';
import styled from 'styled-components';

type ToastProps = {
  message: string;
  isOpen: boolean;
  onClose: VoidFunction;
};

const StyledToast = styled.div<{
  isOpen: boolean;
}>`
  position: fixed;
  bottom: 5px;
  left: 5px;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.df};
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0)')};
  transform-origin: ${({ isOpen }) => (isOpen ? 'left bottom' : 'center')};
  transition: transform
    ${({ theme, isOpen }) =>
      isOpen ? `0.5s ${theme.transition.bouncy}` : '0.2s linear'};
`;

const Toast = ({ message, isOpen, onClose }: ToastProps) => {
  /**
   * It function is to remember its last message incase its still open
   */
  const staticMessage = useRef<string>('');

  useEffect(() => {
    if (!isOpen) return;
    staticMessage.current = message;

    setTimeout(onClose, 1500);
  }, [isOpen]);

  return (
    <StyledToast isOpen={isOpen}>
      {(message || staticMessage.current)?.slice(0, 40)}
    </StyledToast>
  );
};

export default Toast;
