import styled, { css } from "styled-components";
import { MenuTable } from "../features/menu/menuTable";
import { device } from "../ui/device";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

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
