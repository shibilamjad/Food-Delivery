import { Table, TableHeaderOrder } from "../../ui/Row";
import { useOrders } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";

export function OrderTable() {
  const { order, isLoading } = useOrders();
  if (isLoading) return <Loader />;
  return (
    <>
      <Table role="table">
        <TableHeaderOrder role="row">
          <div>Image</div>
          <div>Item</div>
          <div>Qty</div>
          <div>Dates</div>
          <div>Status</div>
          <div>More</div>
          <div></div>
        </TableHeaderOrder>
        {order.map((items) => (
          <OrderRow order={items} key={items._id} />
        ))}
      </Table>
    </>
  );
}
