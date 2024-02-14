import styled, { keyframes } from "styled-components";
import MainNav from "./MainNav";
import { device } from "./device";

export function SideBar({ isOpen }) {
  return (
    <StyledSideBar>
      <MainNav />
    </StyledSideBar>
  );
}
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

const StyledSideBar = styled.div`
  background-color: var(--color-grey-100);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-200);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.4rem;
  color: var(--color-grey-500);
  animation: ${({ isOpen }) => (isOpen ? slideOut : slideIn)} 0.5s ease-in-out;
  @media ${device.laptopL} {
    display: flex; // Always show sidebar on laptop-sized screens
  }
  // Add other media queries for smaller screen sizes
  @media ${device.laptop} {
    padding: 3.2rem 2.4rem;
    transition: all 0.5;
  }
  @media ${device.tablet} {
    padding: 2rem 1.4rem;
    transition: all 0.5;
  }
  @media ${device.mobileL} {
    padding: 1rem 0.4rem;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    padding: 1rem 0.4rem;
    transition: all 0.5;
  }
`;
