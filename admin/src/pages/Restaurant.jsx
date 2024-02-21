import { RestaurantTable } from "../features/Restaurant/RestaurantTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

export function Restaurant() {
  return (
    <>
      <Row>
        <Heading as="h1">All Restaurats</Heading>
        {/* <BookingTable /> */}
        <RestaurantTable />
      </Row>
    </>
  );
}
