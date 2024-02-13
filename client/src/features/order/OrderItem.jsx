import { FcKindle } from 'react-icons/fc';

import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import { EmptyOrder } from './EmptyOrder';
import { useOrder } from './useOrder';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function OrderItem() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { isLoading, order } = useOrder();
  const navigate = useNavigate();

  function handleDetails(orderId) {
    setSelectedOrderId(orderId);
    navigate(`/status/${orderId}`);
  }

  if (isLoading) return <Loader />;
  if (order.length === 0) return <EmptyOrder />;
  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <ul className="mx-auto max-w-4xl list-none divide-y divide-stone-200">
        {order.map((item) => (
          <li className="gap-2 px-6 py-4" key={item._id}>
            {item.cart &&
              item.cart.map((cart) => (
                <div className="flex flex-wrap gap-2 pt-3" key={cart._id}>
                  {cart.imageUrl && (
                    <img
                      src={cart.imageUrl}
                      alt={cart.name}
                      className="h-24 w-24 sm:h-36 sm:w-36"
                    />
                  )}
                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="font-semibold">{cart.name}</span>
                    </p>
                    <p>
                      <span className="text-sm capitalize italic text-stone-500">
                        {cart.ingredients}
                      </span>
                    </p>
                    <p className="text-sm capitalize italic text-stone-500">
                      Quantity: {cart.quantity}
                    </p>
                    {/* <p className="gap-3 text-sm  capitalize italic text-stone-500">
                      <span>Address: {item.address}</span>
                      <span className=" px-3">Phone: {item.mobile}</span>
                    </p> */}
                    <p className="font-semibold text-green-700">
                      Price: ₹{cart.unitPrice}
                    </p>
                  </div>
                </div>
              ))}
            <div className="flex items-center justify-end">
              <button
                onClick={() => handleDetails(item._id)}
                className="text-black-50 mx-4 flex items-center rounded-sm bg-yellow-500 p-1 font-normal sm:p-2 sm:font-semibold"
              >
                <span className="h-30 w-30">
                  <FcKindle />
                </span>
                Details
              </button>

              <p className=" rounded-sm bg-red-700 p-1 font-normal text-yellow-50 sm:p-2 sm:font-semibold ">
                Status: {item.delivery}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
