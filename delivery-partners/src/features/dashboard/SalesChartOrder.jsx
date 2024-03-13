import styled from "styled-components";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
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

function SalesChartOrder({ orderStats, currentFilter }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), currentFilter - 1),
    end: new Date(),
  });
  // total sale per day
  const data = allDates.map((date) => {
    const dailyOrders = orderStats.filter((order) =>
      isSameDay(new Date(order.createdAt), date)
    );
    // Count the number of orders for the day
    const orderPerDay = dailyOrders.length;

    return {
      label: format(date, "MMM dd"),
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
            tick={{ fill: "var(--color-grey-400)" }}
            tickLine={{ stroke: "var(--color-grey-400)" }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: "var(--color-grey-0)" }} />

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

export default SalesChartOrder;

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
