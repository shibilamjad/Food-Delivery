import { OrderTable } from "../features/order/OrderTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

export function Order() {
  return (
    <>
      <Row>
        <Heading as="h1">Available Orders</Heading>
        {/* <BookingTable /> */}
        <OrderTable />
      </Row>
    </>
  );
}
