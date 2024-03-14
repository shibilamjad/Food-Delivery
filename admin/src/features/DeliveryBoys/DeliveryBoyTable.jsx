import styled from "styled-components";
import { Loader } from "../../ui/Loader";
import { useDeliveryBoy } from "./useDeliveryBoy";
import { DeliveryBoyRow } from "./DeliveryBoyRow";
import { device } from "../../ui/device";
export function DeliveryBoyTable() {
  const { deliveryBoys, isLoading } = useDeliveryBoy();
  if (isLoading) return <Loader />;
  return (
    <>
      <Table role="table">
        <TableHeaderOrder>
          <div>Name</div>
          <div>TodayOrder</div>
          <div>TotalOrder</div>
          <div>Salary</div>
          <div></div>
        </TableHeaderOrder>
        {deliveryBoys.map((items) => (
          <DeliveryBoyRow deliveryBoys={items} key={items._id} />
        ))}
      </Table>
    </>
  );
}

const Table = styled.div`
  overflow: scroll;
  scroll-behavior: smooth;
  font-size: 1.4rem;
  border-radius: 7px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    font-size: 0.6rem;
  }
`;

const TableHeaderOrder = styled.header`
  display: grid;
  font-size: 1rem;
  grid-template-columns: 3fr 2fr 2fr 2fr;
  font-weight: 600;
  column-gap: 0.4rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  color: var(--color-grey-400);
  padding: 1rem 1rem;
  width: 100%;

  @media ${device.tablet} {
    font-size: 0.8rem;
    column-gap: 0.5rem;
    padding: 1rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.1rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
`;
