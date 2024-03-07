import { RestaurantTable } from "../features/Restaurant/RestaurantTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

export function OrderCompleated() {
  return (
    <>
      <Row>
        <Heading as="h1">Orders Compleated</Heading>
        <RestaurantTable />
      </Row>
    </>
  );
}
