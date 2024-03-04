import { useParams } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import { Loader } from '../../ui/Loader';
import { OrderBill } from './OrdeBill';
import { useDetails } from './useOrderDetails';
import styled from 'styled-components';

export function Order() {
  const { orderId } = useParams();
  const { details, isLoading } = useDetails(orderId);
  if (isLoading) return <Loader />;
  const statusToTagName = {
    pending: 'bg-red-700',
    ongoing: 'bg-blue-700',
    success: 'bg-green-700',
  };
  return (
    <StyledContainer>
      <div className="mx-2 mt-3">
        <LinkButton to="/order">&larr; Back to order</LinkButton>
      </div>

      <div className="space-y-8 px-4 py-6 ">
        {details.map((order) => (
          <div key={order._id} className="flex flex-col gap-5 ">
            <div className="flex flex-wrap items-center justify-between">
              <h2 className="text-xl font-semibold">Order Id #{order._id}</h2>
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
            <OrderBill order={order} />
          </div>
        ))}
      </div>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
`;
