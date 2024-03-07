import { OrderDetails } from "../features/order/OrderDetails";
import { useOrderDetails } from "../features/order/useOrderDetails";
import { Loader } from "../ui/Loader";
import { EmptyOrder } from "../features/order/EmptyOrder";

export function OrderInprogress() {
  const { details, isLoading } = useOrderDetails();
  if (isLoading) return <Loader />;
  if (details.inprogress.length === 0) return <EmptyOrder />;
  return (
    <>
      <OrderDetails inprogress={details.inprogress} />
    </>
  );
}
