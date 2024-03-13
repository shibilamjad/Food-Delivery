import styled from "styled-components";
import { OrderTable } from "../features/order/OrderTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";
import OrderFilter from "../features/order/OrderFilter";

export function Order() {
  return (
    <Row>
      <StyledContainer>
        <Heading as="h1">All Orders</Heading>
        <OrderFilter />
      </StyledContainer>
      <OrderTable />
    </Row>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
