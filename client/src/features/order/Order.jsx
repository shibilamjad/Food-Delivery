import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useDetails } from './useOrderDetails';

export function Order() {
  const currentUrl = window.location.href;
  const identifier = currentUrl.split('/').pop();
  const { details, isLoading } = useDetails(identifier);
  if (isLoading) return <Loader />;
  console.log(details);
  const statusToTagName = {
    pending: 'bg-red-700',
    ongoing: 'bg-blue-700',
    success: 'bg-green-700',
  };
  return (
    <>
      <div className="mx-2 mt-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>

      <div className="space-y-8 px-4 py-6 ">
        {details.map((item) => (
          <div key={item._id} className="flex flex-col gap-5 ">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-xl font-semibold">
                Order Id #{item._id} status
              </h2>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`gap-2 rounded-full p-2 text-sm font-semibold text-slate-50 ${
                    statusToTagName[item.delivery]
                  }`}
                >
                  {item.delivery} order
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-2 bg-stone-200 px-6 py-6 font-medium">
              <p>name: {item.userName}</p>
              <p className="items-center text-sm text-stone-700">
                Created at: {new Date(item.createdAt).toLocaleString()}
              </p>{' '}
              <p className="items-center text-sm text-stone-700">
                {item.address}
              </p>
              <p className="items-center text-sm text-stone-700">
                {item.mobile}
              </p>
            </div>
            {item.cart && (
              <>
                <ul className="divide-y-2 divide-stone-200 border-b-2 border-t-2">
                  {item.cart.map((cartItem) => (
                    <li key={cartItem._id}>
                      <p>
                        Item name:
                        <span className=" font-semibold">{cartItem.name}</span>
                      </p>
                      <p>Quantity: {cartItem.quantity}</p>
                      <p>Description: {cartItem.ingredients}</p>
                      <p className="font-semibold text-green-700">
                        Price: ₹{cartItem.unitPrice.toLocaleString('en-IN')}
                      </p>
                    </li>
                  ))}
                  <div className=" mt-2 space-y-4 bg-stone-200 px-6 py-6">
                    <p className="font-semibold"></p>
                  </div>
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

// export async function loader({ params }) {
//   const order = await getOrder(params.orderId);
//   return order;
// }

// export default Order;
