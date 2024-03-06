import styled, { css } from "styled-components";
import { device } from "./device";

export const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
      margin: 10px;
      padding: 10px;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
export const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  font-weight: 600;
  color: var(--color-grey-400);
  padding: 1.6rem 2.4rem;
  @media ${device.tablet} {
    padding: 1rem 2rem;
    column-gap: 1.4rem;
    /* grid-template-columns: 1fr 1fr 0.2fr 0.2fr 0.2fr 0.6fr; */
  }
  @media ${device.mobileL} {
    padding: 0.7rem 0.6rem;
    column-gap: 0.8rem;
    /* grid-template-columns: 0.5fr 0.5fr 0.2fr 0.2fr 0.2fr 0.4fr; */
  }
`;

export const TableHeaderOrder = styled.header`
  display: grid;
  font-size: 1rem;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  font-weight: 600;
  column-gap: 0.4rem;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  color: var(--color-grey-400);
  padding: 1rem 1rem;
  @media ${device.tablet} {
    font-size: 0.7rem;
    column-gap: 0.5rem;
    padding: 1rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 1rem 1rem;
    font-size: 0.5rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.1rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
`;
export const Table = styled.div`
  overflow: scroll;
  scroll-behavior: smooth;
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-0);
  border-radius: 7px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${device.tablet} {
    font-size: 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    font-size: 0.8rem;
  }
`;
