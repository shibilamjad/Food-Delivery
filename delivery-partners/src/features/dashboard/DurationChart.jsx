import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function DurationChart({ orderStats }) {
  // Count occurrences of each item name
  const name = orderStats.map((item) =>
    item.cart.map((cartItem) => cartItem.menuItem.name)
  );
  let itemCounts = {};
  name.forEach((names) => {
    names.forEach((name) => {
      itemCounts[name] = (itemCounts[name] || 0) + 1;
    });
  });

  // Convert itemCounts object to data array for PieChart
  const data = Object.entries(itemCounts).map(([name, value]) => ({
    name,
    value,
    // Assign a random color to each item
    color: generateRandomColor(),
  }));

  return (
    <ChartBox>
      <Heading as="h2">Most Selling Items</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="name"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
