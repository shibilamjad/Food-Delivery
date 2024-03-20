import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { device } from "../../ui/device";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
  @media ${device.tablet} {
    grid-column: 1 / -1;
  }
`;

function TodayActivity({ orderStats, users, currentFilter }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), currentFilter - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    const totalOrders = orderStats.filter((order) =>
      isSameDay(new Date(order.createdAt), date)
    );
    const totalUser = users.filter((user) =>
      isSameDay(new Date(user.createdAt), date)
    );
    const orderPerDay = totalOrders.length;
    const userPerDay = totalUser.length;
    return {
      label: format(date, "MMM dd"),
      orderPerDay,
      userPerDay,
    };
  });
  return (
    <StyledToday>
      <Heading as="h2">Total Orders</Heading>
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: "var(--color-grey-400)" }}
            tickLine={{ stroke: "var(--color-grey-400)" }}
          />
          <YAxis
            tick={{ fill: "var(--color-grey-400)" }}
            tickLine={{ stroke: "var(--color-grey-400)" }}
          />
          <CartesianGrid strokeDasharray="3" />
          <Tooltip
            contentStyle={{ backgroundColor: "var(--color-grey-0)" }}
            labelStyle={{ color: "var(--color-grey-600)" }}
            cursor={{ stroke: "var(--color-grey-400)", strokeWidth: 1 }}
            wrapperStyle={{ zIndex: 1000 }}
          />
          <Line
            type="monotone"
            dataKey="orderPerDay"
            stroke="#4f46e5"
            fill="#4f46e5"
            name="Total Orders"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="userPerDay"
            stroke="#22c55e"
            fill="#22c55e"
            name="Total User"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </StyledToday>
  );
}

export default TodayActivity;
