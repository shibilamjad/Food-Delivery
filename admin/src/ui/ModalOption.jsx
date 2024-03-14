import styled from "styled-components";
import { device } from "./device";

function ModalOption({ children }) {
  return (
    <Overlay>
      <StyledModal>
        <div>{children}</div>
      </StyledModal>
    </Overlay>
  );
}

export default ModalOption;

const StyledModal = styled.div`
  position: absolute;
  left: 4px;
  top: 4px;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 1rem 1rem;
  transition: all 0.5s;
  @media ${device.mobileL} {
    left: 0px;
    top: 4px;
    padding: 0.5rem 0.5rem;
  }
`;
const Overlay = styled.div`
  position: relative;

  left: 83%;
  bottom: -50px;
  z-index: 1000;
  transition: all 0.5s;
  @media ${device.tablet} {
    left: 70%;
    bottom: -50px;
  }
  @media ${device.mobileL} {
    left: 70%;
    bottom: -50px;
  }
`;
