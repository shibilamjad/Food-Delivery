import { Table, TableHeaderOrder } from "../../ui/Row";
import { useOrders } from "./useOrder";
import { Loader } from "../../ui/Loader";
import { OrderRow } from "./OrderRow";

import io from "socket.io-client";
import { useEffect, useState } from "react";

export function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("http://localhost:3006", {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("deliveryBoyLocationUpdate", {
            token: token,
            latitude,
            longitude,
          });

          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Cleanup function
    return () => {
      socket.disconnect();
    };
  }, []);

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
