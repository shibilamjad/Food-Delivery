import { useNavigate } from 'react-router-dom';
import { FcKindle } from 'react-icons/fc';
import styled from 'styled-components';

import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import { EmptyOrder } from './EmptyOrder';
import { useOrder } from './useOrder';

export function OrderItem() {
  const { isLoading, order } = useOrder();
  const orderItems = order && order.filter((items) => items.cart.length > 0);
  const navigate = useNavigate();

  function handleDetails(orderId) {
    navigate(`/status/${orderId}`);
  }
  if (isLoading) return <Loader />;
  if (order.length === 0) return <EmptyOrder />;
  const getStatusClasses = (status) => {
    const statusToClassName = {
      pending: 'bg-red-700',
      inprogress: 'bg-blue-700',
      success: 'bg-green-700',
    };
    return statusToClassName[status] || 'bg-gray-700';
  };
  return (
    <StyledContainer>
      <div className="px-3 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
        <ul className=" list-none divide-y divide-stone-200">
          {orderItems.map((item) => (
            <li className="gap-2 px-6 py-4" key={item._id}>
              {item.cart &&
                item.cart.map((cart) => (
                  <div
                    className="flex flex-wrap gap-2 pt-3"
                    key={cart.menuItem._id}
                  >
                    {cart.menuItem.imageUrl && (
                      <img
                        src={cart.menuItem.imageUrl}
                        alt={cart.menuItem.name}
                        className="h-24 w-24 sm:h-36 sm:w-36"
                      />
                    )}
                    <div className="flex flex-col gap-2">
                      <p>
                        <span className="font-semibold">
                          {cart.menuItem.name}
                        </span>
                      </p>
                      <p>
                        <span className="text-sm capitalize italic text-stone-500">
                          {cart.menuItem.ingredients}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              <div className="flex items-center justify-end">
                <button
                  onClick={() => handleDetails(item._id)}
                  className="text-black-50 mx-4 flex items-center rounded-sm bg-yellow-400 p-1 font-normal hover:bg-yellow-300 sm:p-2 sm:font-semibold"
                >
                  <span className="h-30 w-30">
                    <FcKindle />
                  </span>
                  Details
                </button>

                <p
                  className={`rounded-sm p-1 font-normal text-white ${getStatusClasses(
                    item.delivery,
                  )} sm:p-2 sm:font-semibold`}
                >
                  Status: {item.delivery}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
`;
