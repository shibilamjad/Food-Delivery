import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useClickOption } from '../hooks/useClickOutSide';
import { device } from './device';

function ModalConfirm({ children, onClose }) {
  const ref = useClickOption(onClose);

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

export default ModalConfirm;

const StyledModal = styled.div`
  width: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  @media ${device.tablet} {
    width: 80%;
    padding: 2rem 2rem;
  }
  @media ${device.mobileL} {
    width: 80%;
    padding: 2rem 2rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(89, 89, 89, 0.3);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 4px;
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: black;
  }
`;
