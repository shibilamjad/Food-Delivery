import { HistoryTable } from "../features/orderHistory/HistoryTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

function OrderCompleted() {
  return (
    <>
      <Row>
        <Heading as="h1">Orders Completed</Heading>
        <HistoryTable />
      </Row>
    </>
  );
}
export default OrderCompleted;
