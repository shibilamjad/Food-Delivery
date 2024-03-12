import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ orderStats }) {
  // 1 today orders
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);

  // filter orders for today
  const todayOrder = orderStats.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
    return orderDate === todayDate;
  });

  // 2 total order
  const numOrder = orderStats.length;

  // 3 get total price
  const ordersArray = Object.values(orderStats);
  // Calculate total delivery charges
  const totalDeliveryCharges = ordersArray.reduce((total, order) => {
    return total + order.deliveryCharge;
  }, 0);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const formattedNumber = formatter.format(totalDeliveryCharges);

  return (
    <>
      <Stat
        title="Today Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={todayOrder.length}
      />
      <Stat
        title="Total Order"
        color="green"
        icon={<HiOutlineChartBar />}
        value={numOrder}
      />
      <Stat
        title="Total Revenew"
        color="yellow"
        icon={<HiOutlineBanknotes />}
        value={formattedNumber}
      />
    </>
  );
}

export default Stats;
