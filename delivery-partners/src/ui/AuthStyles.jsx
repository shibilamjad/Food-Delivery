import styled from "styled-components";
import { device } from "./device";
import { Link } from "react-router-dom";

export const StyledSign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 17px;
  margin-top: 80px;
  p {
    color: var(--color-grey-700);
    margin-top: 1rem;
  }
  @media ${device.laptopL} {
    font-size: 17px;

    margin-top: 100px;
  }
  @media ${device.laptop} {
    font-size: 17px;
    margin-top: 10px;
  }
  @media ${device.tablet} {
    font-size: 15px;
    margin-top: 10px;
  }
  @media ${device.mobileL} {
    font-size: 13px;
    margin-top: 10px;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    margin-top: 10px;
  }
`;

export const H1 = styled.h1`
  color: var(--color-grey-700);
  /* color: var(--color-h1); */
  font-size: 32px;
  @media ${device.laptop} {
    font-size: 28px;
  }
  @media ${device.laptopL} {
    font-size: 25px;
  }
  @media ${device.tablet} {
    font-size: 17px;
  }
  @media ${device.mobileL} {
    font-size: 14px;
  }
  @media ${device.mobileS} {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  margin-top: 20px;
  width: 100%;
  border: transparent;
  color: #fff;
  background-color: #292929;
  border-radius: 4px;
  &:hover {
    background-color: #121212;
    transition: background 0.3s;
  }
  @media ${device.laptopL} {
    font-size: 15px;
    padding: 8px 12px;
    margin-bottom: 8px;
  }
  @media ${device.laptop} {
    font-size: 14px;

    padding: 8px 12px;
    margin-bottom: 8px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    padding: 8px 12px;
    margin-bottom: 3px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    padding: 6px 10px;
    margin-bottom: 3px;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    padding: 6px 10px;
    margin-bottom: 4px;
  }
`;
export const NavLink = styled(Link)`
  display: flex;
  cursor: pointer;
  color: #1e1e1e;
  font-weight: 700;
  font-size: 17px;
`;

export const AlignCenter = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;
export const Error = styled.p`
  font-size: 12px;
  /* margin-bottom: 10px; */
  color: var(--color-grey-700);
  font-weight: 300;
`;
