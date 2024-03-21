import styled from 'styled-components';
import { device } from './device';

export const Input = styled.input`
  padding: 10px 15px;
  width: 70%;
  border: transparent;
  color: #000000;
  font-weight: 500;
  background-color: #dfdfdf;
  border-radius: 4px;
  margin-bottom: 16px;
  &::placeholder {
    font-size: 15px;
    color: #212121;
  }
  &:focus {
    outline: none;
  }
  @media ${device.laptopL} {
    font-size: 16px;
    padding: 15px 15px;
  }
  @media ${device.laptop} {
    font-size: 16px;
    padding: 15px 15px;
  }
  @media ${device.tablet} {
    font-size: 14px;
    padding: 14px 10px;
    margin-bottom: 8px;
  }
  @media ${device.mobileL} {
    font-size: 12px;
    padding: 10px 10px;
    margin-bottom: 4px;
    width: 90%;
  }
  @media ${device.mobileS} {
    font-size: 12px;
    padding: 10px 10px;
    margin-bottom: 4px;
  }
`;
