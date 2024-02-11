import styled from "styled-components";
import { device } from "./device";

function Modal({ children }) {
  return <StyledMovie>{children}</StyledMovie>;
}

export default Modal;

const StyledMovie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: auto;
  color: white;
  background-color: #3730a3;
  border-radius: 4px;
  padding: 10px 5px;
  gap: 20px;

  @media ${device.laptopL} {
    width: 600px;
    height: auto;
  }
  @media ${device.laptop} {
    width: 600px;
    height: auto;
  }
  @media ${device.tablet} {
    width: 400px;
    height: auto;
  }
  @media ${device.mobileL} {
    width: auto;
    height: auto;
  }
  @media ${device.mobileS} {
    width: 230px;
    height: auto;
  }
`;
