import styled from "styled-components";
import { OrderTable } from "../features/order/OrderTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";
import OrderFilter from "../features/order/OrderFilter";
import { device } from "../ui/device";

function Order() {
  return (
    <Row type="vertical">
      <StyledContainer>
        <Heading as="h1">All Orders</Heading>
        <OrderFilter />
      </StyledContainer>
      <OrderTable />
    </Row>
  );
}
export default Order;
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;
