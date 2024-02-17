import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "../features/dashboard/Stat";

function Stats({ orderStats }) {
  const { delivery } = orderStats;

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

  // 3. all pending items
  const totalPending = orderStats.filter(
    (order) => order.delivery === "pending"
  ).length;

  // 4 get total price
  const totalPrices = orderStats.map((order) =>
    order.cart.reduce((acc, cartItem) => acc + cartItem.totalPrice, 0)
  );
  const totalPrice = totalPrices.reduce((acc, price) => acc + price, 0);

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  const formattedNumber = formatter.format(totalPrice);

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
        title="Pending Orders"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={totalPending}
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
