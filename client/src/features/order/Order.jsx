import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import { OrderBill } from './OrdeBill';
import { OrderCart } from './OrderCart';
import { useDetails } from './useOrderDetails';

export function Order() {
  const currentUrl = window.location.href;
  const identifier = currentUrl.split('/').pop();
  const { details, isLoading } = useDetails(identifier);
  console.log(details);
  if (isLoading) return <Loader />;
  const statusToTagName = {
    pending: 'bg-red-700',
    ongoing: 'bg-blue-700',
    success: 'bg-green-700',
  };
  return (
    <>
      <div className="mx-2 mt-3">
        <LinkButton to="/order">&larr; Back to order</LinkButton>
      </div>

      <div className="space-y-8 px-4 py-6 ">
        {details.map((order) => (
          <div key={order._id} className="flex flex-col gap-5 ">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-xl font-semibold">
                Order Id #{order._id} status
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`gap-2 rounded-full p-2 text-sm font-semibold text-slate-50 ${
                    statusToTagName[order.delivery]
                  }`}
                >
                  {order.delivery} order
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 bg-stone-200 px-6 py-6 font-medium">
              <p>name: {order.userName}</p>
              <p className="items-center text-sm text-stone-700">
                Created at: {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="items-center text-sm text-stone-700">
                {order.address}
              </p>
              <p className="items-center text-sm text-stone-700">
                {order.mobile}
              </p>
            </div>
            {/* {order.cart && (
              <>
                <ul className="divide-y-2 divide-stone-200 border-b-2 border-t-2">
                  {order.cart &&
                    order.cart.map((cartItem) => (
                      <OrderCart
                        key={cartItem.menuItem._id}
                        totalPrice={cartItem.totalPrice}
                        quantity={cartItem.quantity}
                        menuItem={cartItem.menuItem}
                      />
                    ))}
                </ul>
                <div className=" mt-2 space-y-4 bg-stone-200 px-6 py-6"></div>
              </>
            )} */}
            <OrderBill order={order} />
          </div>
        ))}
      </div>
    </>
  );
}
{
  /* <li key={cartItem.menuItem._id}>
<p>
  Item name:
  <span className=" font-semibold">
    {cartItem.menuItem.name}
  </span>
</p>
<p>Quantity: {cartItem.quantity}</p>
<p>Description: {cartItem.menuItem.ingredients}</p>
<p className="font-semibold text-green-700">
  Price: ₹{cartItem.menuItem.unitPrice}
</p>
</li> */
}
