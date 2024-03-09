export function OrderBill({ order }) {
  const discount = order.cart.reduce(
    (totalDiscount, item) => totalDiscount + item.menuItem.discount,
    0,
  );
  const totalAmount = calculateTotal(order.cart);

  return (
    <div className=" mx-3 flex flex-col gap-1">
      <h1 className=" border-grey border-b-2 py-2 text-[20px] font-semibold">
        Order Bill
      </h1>
      <p>Order ID: {order._id}</p>
      <p>Order Status: {order.delivery}</p>
      <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>

      <div className="cart-items">
        <ul>
          {order.cart.map((item) => (
            <li key={item.menuItem._id}>
              <p>Item: {item.menuItem.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.totalPrice}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-2 border-t-2  border-black pt-1 text-[20px] font-semibold ">
        <p>Total Amount: ₹{totalAmount + discount}</p>
        <p className="text-red-700 ">Discount: ₹{discount}</p>
        <p className="text-green-700 ">
          DeliveryCharge: ₹{order.deliveryCharge}
        </p>
        <p className="mt-4 border-t-2 text-green-700 ">
          Total Payable Amount: ₹{totalAmount + order.deliveryCharge}
        </p>
      </div>
    </div>
  );
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.totalPrice, 0);
}
