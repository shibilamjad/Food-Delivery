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
    // Calculate total delivery charges for the day
    const totalDeliveryCharges = dailyOrders.reduce((total, order) => {
      if (order && typeof order === "object" && "deliveryCharge" in order) {
        return total + order.deliveryCharge;
      }
      return total;
    }, 0);

    return {
      label: format(date, "MMM dd"),
      totalDeliveryCharges,
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
            dataKey="totalDeliveryCharges"
            type="monotone"
            stroke="#4f46e5"
            fill="#4f46e5"
            strokeWidth={2}
            name="Total sales"
            unit="₹"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
