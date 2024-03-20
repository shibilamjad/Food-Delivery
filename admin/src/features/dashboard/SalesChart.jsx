import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ orderStats, currentFilter }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), currentFilter - 1),
    end: new Date(),
  });
  // total sale per day
  const data = allDates.map((date) => {
    const dailyOrders = orderStats.filter((order) =>
      isSameDay(new Date(order.createdAt), date)
    );
    // per day cash
    const totalSales = dailyOrders.reduce(
      (acc, cur) =>
        acc + cur.cart.reduce((total, item) => total + item.totalPrice, 0),
      0
    );
    // per day cash
    const orderPerDay = dailyOrders.length;
    return {
      label: format(date, "MMM dd"),
      totalSales,
      orderPerDay,
    };
  });

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[currentFilter - 1], "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-grey-400)" }}
            tickLine={{ stroke: "var(--color-grey-400)" }}
          />
          <YAxis
            unit="₹"
            tick={{ fill: "var(--color-grey-400)" }}
            tickLine={{ stroke: "var(--color-grey-400)" }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: "var(--color-grey-0)" }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke="#4f46e5"
            fill="#4f46e5"
            strokeWidth={2}
            name="Total sales"
            unit="₹"
          />
          <Area
            dataKey="orderPerDay"
            type="monotone"
            stroke="#22c55e"
            fill="#22c55e"
            strokeWidth={2}
            name="Daily Order"
            // unit="₹"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
