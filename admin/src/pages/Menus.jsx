import styled, { css } from "styled-components";
import { MenuTable } from "../features/menu/menuTable";
import { device } from "../ui/device";

export function Menus() {
  return (
    <>
      <Row>
        <Heading as="h1">All Menus</Heading>
        <MenuTable />
      </Row>
    </>
  );
}

const Heading = styled.h1`
  color: #3730a3;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      @media ${device.tablet} {
        font-size: 2rem;
      }
      @media ${device.mobileL} {
        font-size: 1.5rem;
      }
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;

const Row = styled.div`
  color: #3730a3;
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
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
