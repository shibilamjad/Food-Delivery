import { FaAlignJustify, FaBell, FaXmark } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";
import { useState } from "react";

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
  background-color: var(--color-grey-100);
  box-shadow: var(--shadow-lg);
  color: var(--color-grey-800);
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideIn)} 0.5s ease-in-out;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Container = styled.div`
  position: relative;
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
const Button = styled.button`
  padding-right: 20px;
  svg {
    color: var(--color-grey-700);
  }
  :hover,
  :focus {
    color: var(--color-brand-500);
  }
`;
const StledContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
