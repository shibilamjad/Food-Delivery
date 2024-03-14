import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { device } from "./device";

function Filter({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("delivery") || "all";
  function handleClick(value) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("delivery", value);
    if (newSearchParams.get("page")) newSearchParams.set("page", 1);

    setSearchParams(newSearchParams);
  }
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  @media ${device.tablet} {
    font-size: 15px;
    padding: 0.24rem 0.6rem;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    padding: 0.1rem 0.3rem;
  }
  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
