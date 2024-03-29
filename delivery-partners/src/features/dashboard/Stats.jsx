import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { subDays } from "date-fns";

function Stats({ orderStats, currentFilter }) {
  const startDate = subDays(new Date(), currentFilter);

  // 1 today orders
  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);
  // filter orders for today
  const todayOrder = orderStats.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
    return orderDate === todayDate;
  });

  // Calculate total delivery charges for today
  const todayDeliveryCharges = todayOrder.reduce((total, order) => {
    return total + order.deliveryCharge;
  }, 0);
  // 2 total order
  const ordersDays = orderStats.filter(
    (item) => new Date(item.createdAt) >= startDate
  );
  const numOrder = ordersDays.length;
  // 3 get total price

  const ordersWithinRange = orderStats.filter(
    (order) => new Date(order.createdAt) >= startDate
  );
  // Calculate total delivery charges
  const totalDeliveryCharges = ordersWithinRange.reduce((total, order) => {
    return total + order.deliveryCharge;
  }, 0);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const formattedSalary = formatter.format(todayDeliveryCharges);
  const formattedRevenue = formatter.format(totalDeliveryCharges);

  return (
    <>
      <Stat
        title="Today Orders"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={todayOrder.length}
      />
      <Stat
        title="Today Salary"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formattedSalary}
      />
      <Stat
        title="Total Order"
        color="red"
        icon={<HiOutlineChartBar />}
        value={numOrder}
      />
      <Stat
        title="Total Revenew"
        color="yellow"
        icon={<HiOutlineBanknotes />}
        value={formattedRevenue}
      />
    </>
  );
}

export default Stats;
