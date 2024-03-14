import styled from "styled-components";
import { Table, TableHeaderOrder } from "../../ui/Row";
import { useOrders } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";
import empty from "../../assets/empty.png";
export function OrderTable() {
  const { order, isLoading } = useOrders();
  if (isLoading) return <Loader />;
  return (
    <>
      <Table role="table">
        <TableHeaderOrder>
          <div>Image</div>
          <div>Item</div>
          <div>Amt</div>
          <div>Dates</div>
          <div>Status</div>
          <div>More</div>
          <div></div>
        </TableHeaderOrder>
        {order.length === 0 ? (
          <Empty>
            <img src={empty} alt="image" />
          </Empty>
        ) : (
          order.map((items) => <OrderRow order={items} key={items._id} />)
        )}
      </Table>
    </>
  );
}

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
