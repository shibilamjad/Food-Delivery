export function OrderCart({ menuItem, totalPrice, quantity }) {
  return (
    <li key={menuItem._id}>
      <p className=" font-semibold">
        Item name:
        {menuItem.name}
      </p>
      <p className=" font-semibold">Quantity:{quantity}</p>
      <p className=" font-semibold">Description: {menuItem.ingredients}</p>
      <p className="font-semibold text-green-700">Price: ₹{totalPrice}</p>
    </li>
  );
}
