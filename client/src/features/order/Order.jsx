import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';

export function Order() {
  return (
    <div className=" space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className=" text-xl font-semibold">Order # status</h2>

        <div className=" flex flex-wrap items-center justify-between gap-2">
          <span className="gap-2 rounded-full bg-green-500 p-2 text-sm font-semibold text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div
        className=" flex flex-wrap items-center 
        justify-between  bg-stone-200 
       px-6 py-6 font-medium"
      >
        <p>
          {/* {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'} */}
        </p>
        <p className=" items-center text-sm text-stone-700">
          {/* (Estimated delivery: {formatDate(estimatedDelivery)}) */}
        </p>
      </div>
      <ul className=" divide-y-2 divide-stone-200 border-b-2 border-t-2">
        {/* {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))} */}
      </ul>
      <div
        className="   space-y-4 bg-stone-200 
      px-6 py-6  "
      >
        <p>Price pizza</p>
        {/* {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>} */}
        <p className="font-semibold">
          {/* To pay on delivery: {formatCurrency(orderPrice + priorityPrice)} */}
        </p>
      </div>
    </div>
  );
}

// export async function loader({ params }) {
//   const order = await getOrder(params.orderId);
//   return order;
// }

// export default Order;
