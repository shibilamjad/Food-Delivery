import styled from "styled-components";
import { device } from "./device";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: 3px;
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: 3px;
    border: none;
    color: #eef2ff;
    background-color: #4f46e5;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;
    @media ${device.laptopL} {
      padding: 0.8rem 1.2rem;
      margin-right: 1.2rem;
    }
    @media ${device.laptop} {
      padding: 0.8rem 1.2rem;
      margin-right: 1.2rem;
    }
    @media ${device.tablet} {
      padding: 0.5rem 0.8rem;
      margin-right: 0.8rem;
    }
    @media ${device.mobileL} {
      padding: 0.5rem 0.8rem;
      margin-right: 0.8rem;
    }
    @media ${device.mobileS} {
      padding: 0.5rem 0.8rem;
      margin-right: 0.8rem;
    }
    &:hover {
      background-color: #4338ca;
    }
  }
`;

export default FileInput;
