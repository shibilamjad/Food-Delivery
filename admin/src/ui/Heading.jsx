import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-weight: 700px;
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
    `}
`;

export default Heading;
