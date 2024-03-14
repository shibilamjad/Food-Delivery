import styled, { css } from "styled-components";
import { device } from "./device";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-weight: 700px;

      @media ${device.tabletS} {
        font-size: 2rem;
      }
      @media ${device.mobileL} {
        font-size: 1.6rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600px;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500px;
      @media ${device.mobileL} {
        font-size: 1rem;
      }
    `}
`;

export default Heading;
