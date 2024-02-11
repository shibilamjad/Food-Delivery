import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
// import { SideBar } from "./SideBar";

export function Header({ handleIsOpen, isOpen }) {
  return (
    <>
      <Headers>
        <StyledHeader isOpen={isOpen}>
          <StledContent>
            <div>
              <button onClick={handleIsOpen}>
                {!isOpen ? <FaXmark /> : <FaAlignJustify />}
              </button>
            </div>
            <div>
              <h1>Dashboard</h1>
            </div>
          </StledContent>
        </StyledHeader>
      </Headers>
    </>
  );
}
const Headers = styled.header`
  background-color: #3730a3;
  color: #fff;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideIn)} 0.5s ease-in-out;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;
const StledContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
