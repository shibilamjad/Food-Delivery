import io from "socket.io-client";
import { Table, TableHeaderOrder } from "../../ui/Row";
import { useDeliveryBoyOrder } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";
import { useEffect } from "react";

const token = localStorage.getItem("token");
export function OrderTable() {
  const { order, isLoading } = useDeliveryBoyOrder();

  useEffect(() => {
    const socket = io("http://localhost:3006");

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
        {order.map((items) => (
          <OrderRow order={items} key={items._id} />
        ))}
      </Table>
    </>
  );
}
