import styled from "styled-components";
import { useEffect } from "react";
import io from "socket.io-client";

import { Table, TableHeaderOrder } from "../../ui/Row";
import { useDeliveryBoyOrder } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";

export function OrderTable() {
  const { order, isLoading } = useDeliveryBoyOrder();
  useEffect(() => {
    const socket = io("https://food-delivery-4.onrender.com");
    const token = localStorage.getItem("token");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("deliveryBoyLocationUpdate", {
            token: token,
            latitude,
            longitude,
          });

          // setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      socket.disconnect();
    };
  }, []);
  if (isLoading) return <Loader />;
  return (
    <>
      <Table role="table">
        <TableHeaderOrder role="row">
          <div>Image</div>
          <div>Restaurant</div>
          <div>Time</div>
          <div>Status</div>
          <div></div>
        </TableHeaderOrder>
        {order.length === 0 && (
          <Empty>
            <p>Your Current Location Areas(10km) Are Not Get any Orders</p>
          </Empty>
        )}
        {order.map((items) => (
          <OrderRow order={items} key={items._id} />
        ))}
      </Table>
    </>
  );
}
const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--color-red-700);
`;
