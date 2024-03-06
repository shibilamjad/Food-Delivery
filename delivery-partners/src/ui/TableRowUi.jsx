import styled from "styled-components";
import { device } from "./device";

export const TableRow = styled.div`
  display: grid;
  font-size: 1.4rem;
  grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  @media ${device.tablet} {
    font-size: 1rem;
    column-gap: 1rem;
    padding: 1.4rem 2.4rem;
    /* grid-template-columns: 1fr 1fr 0.2fr 0.2fr 0.2fr 0.6fr; */
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 0.4rem 1rem;
    /* grid-template-columns: 0.5fr 0.5fr 0.2fr 0.2fr 0.2fr 0.4fr; */
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.5rem;
    padding: 0.1rem 1rem;
    font-size: 0.8rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const TableRowOrder = styled.div`
  display: grid;
  font-size: 1.2rem;
  text-transform: capitalize;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  column-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  @media ${device.tablet} {
    font-size: 0.7rem;
    column-gap: 0.5rem;
    padding: 2rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    /* padding: 1rem 1rem; */
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.1rem;
    padding: 1rem 1rem;
    font-size: 0.8rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const TableRowRestaurant = styled.div`
  display: grid;
  font-size: 1.2rem;
  text-transform: capitalize;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  /* column-gap: 0.4rem; */
  margin-left: 10px;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  @media ${device.tablet} {
    font-size: 0.7rem;
    column-gap: 0.5rem;
    padding: 2rem 2rem;
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
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;
export const Img = styled.img`
  display: block;
  height: 100px;

  width: 100px;
  margin: 10px;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  @media ${device.tablet} {
    display: flex;
    width: 50px;
    margin: 5px;
    height: 50px;
    object-fit: fill;
    object-position: center;
    /* transform: scale(1.5) translateX(-7px); */
  }
  @media ${device.mobileL} {
    object-fit: cover;
    width: 30px;
    margin: 5px;
    height: 28px;
    object-fit: fill;
    object-position: fill;
    /* transform: scale(1.5) translateX(-7px); */
  }
`;

export const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
export const Title = styled.h1`
  font-weight: 600;
  color: var(--color-grey-600);
`;
export const Address = styled.h1`
  font-weight: 600;
  color: var(--color-grey-400);
`;

export const Menu = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  height: auto;
  margin-left: 10px;
  overflow-wrap: break-word;
`;
export const Dates = styled.div`
  font-weight: 600;
  color: var(--color-brand-200);
  opacity: 0.7;
`;
export const Price = styled.div`
  font-weight: 600;
  color: var(--color-grey-500);
`;
export const IsAvailable = styled.div`
  font-weight: 600;
  color: ${(props) => props.color};
`;

export const Discount = styled.div`
  font-weight: 500;
  color: var(--color-red-700);
`;

export const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  /* transform: translateX(0.8rem); */
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }
  &:active {
    border: var(--color-grey-500);
  }
`;

export const StyledIcon = styled.div`
  display: flex;
  flex-wrap: wrap;
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-300);
    transition: all 0.3s;
    &:hover {
      color: var(--color-brand-500);
    }
    @media ${device.tablet} {
      width: 1.2rem;
      height: 1.2rem;
    }
    @media ${device.mobileL} {
      width: 0.8rem;
      height: 0.8rem;
    }
    @media ${device.mobileL} {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

export const EditSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  @media ${device.tablet} {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
  }
  @media ${device.mobileS} {
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }
`;
