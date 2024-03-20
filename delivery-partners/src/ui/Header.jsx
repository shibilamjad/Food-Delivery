import { FaAlignJustify, FaXmark } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";

export function Header({ handleIsOpen, isOpen }) {
  return (
    <>
      <Headers>
        <StyledHeader>
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
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const StledContent = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
