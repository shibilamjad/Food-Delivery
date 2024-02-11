import styled from "styled-components";
import { device } from "./device";

export function Button({ children }) {
  return <Buttons>{children}</Buttons>;
}

const Buttons = styled.button`
  background-color: #3730a3;
  color: #fff;
  padding: 10px;
  margin-bottom: 60px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  border: 1px solid #fff;
  width: 400px;
  @media ${device.laptopL} {
    width: 400px;
    height: auto;
  }
  @media ${device.laptop} {
    width: 400px;
    height: auto;
  }
  @media ${device.tablet} {
    width: 200px;
    height: auto;
  }
  @media ${device.mobileL} {
    width: 200px;
    height: auto;
  }
  @media ${device.mobileS} {
    /* width: 200px; */
    height: auto;
  }
  &:hover,
  &:focus {
    background-color: #4941bf;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    transition: background-color 0.5s ease;
  }
`;
