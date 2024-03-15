import styled from "styled-components";
import { device } from "../ui/device";

import Heading from "../ui/Heading";
import { Row } from "../ui/Row";
import { DeliveryBoyTable } from "../features/DeliveryBoys/DeliveryBoyTable";
import DeliveryFilter from "../features/DeliveryBoys/DeliveryFilter";

function DeliveryBoy() {
  return (
    <Row type="vertical">
      <StyledContainer>
        <Heading as="h1">DeliveryBoys Details</Heading>
        <DeliveryFilter />
      </StyledContainer>
      <DeliveryBoyTable />
    </Row>
  );
}

export default DeliveryBoy;

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
