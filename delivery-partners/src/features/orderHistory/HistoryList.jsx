import { HistoryRow } from "./HistoryRow";
import { TableRowRestaurant } from "../../ui/TableRowUi";

export function HistoryList({ order }) {
  return (
    <>
      {order.map((item) => (
        <TableRowRestaurant key={item._id}>
          <HistoryRow
            cart={item.cart}
            deliveryCharge={item.deliveryCharge}
            delivery={item.delivery}
            orderId={item._id}
          />
        </TableRowRestaurant>
      ))}
    </>
  );
}
