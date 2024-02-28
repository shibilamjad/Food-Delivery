import { Table, TableHeaderOrder } from "../../ui/Row";
import { useOrders } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";

import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:3006");
export function OrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("availableOrders", (orders) => {
      setOrders(orders);
    });

    return () => {
      socket.off("availableOrders");
    };
  }, []);
  console.log(orders);

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
