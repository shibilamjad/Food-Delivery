import { OrderTable } from "../features/order/OrderTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

export function Order() {
  // const handleDirections = () => {
  //   const deliveryBoyLat = 11.1735886; // Example delivery boy's latitude
  //   const deliveryBoyLng = 75.8573888; // Example delivery boy's longitude
  //   const userLat = 11.1783133; // Example user's latitude
  //   const userLng = 75.8566218; // Example user's longitude
  //   const googleMapsUrl = `https://www.google.com/maps/dir/${deliveryBoyLat},${deliveryBoyLng}/${userLat},${userLng}`;
  //   window.open(googleMapsUrl, "_blank");
  // };

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
