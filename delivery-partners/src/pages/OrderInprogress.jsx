import { OrderDetails } from "../features/orderInprogress/OrderDetails";
import { useOrderDetails } from "../features/orderInprogress/useOrderDetails";
import { Loader } from "../ui/Loader";
import { EmptyOrder } from "../features/orderInprogress/EmptyOrder";

function OrderInprogress() {
  const { details, isLoading } = useOrderDetails();
  if (isLoading) return <Loader />;
  if (details.inprogress.length === 0) return <EmptyOrder />;
  return (
    <>
      <OrderDetails inprogress={details.inprogress} />
    </>
  );
}
export default OrderInprogress;
