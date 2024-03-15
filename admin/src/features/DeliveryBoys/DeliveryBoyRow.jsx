import styled from "styled-components";
import { device } from "../../ui/device";
import { useSearchParams } from "react-router-dom";

export function DeliveryBoyRow({ deliveryBoys }) {
  const { name, mobile, ordersCompleted } = deliveryBoys;
  // sortby orders
  const [searchParams] = useSearchParams();
  const today = new Date();
  const sortBy = searchParams.get("sortBy") || today.getMonth();
  const currentMonth = Number(sortBy);

  const currentYear = today.getFullYear();
  const todayDate = today.toISOString().slice(0, 10);
  // 1 today orders
  const todayOrder = ordersCompleted.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().slice(0, 10);
    return orderDate === todayDate;
  });
  // Filter orders completed within the current month
  const ordersThisMonth = ordersCompleted.filter((item) => {
    const completedDate = new Date(item.createdAt);
    return (
      completedDate.getMonth() === currentMonth &&
      completedDate.getFullYear() === currentYear
    );
  });
  // Calculate the total salary for this month
  const totalSalaryThisMonth = ordersThisMonth.reduce((total, item) => {
    return total + item.deliveryCharge;
  }, 0);

  const statusToTagName = {
    1: "red",
    2: "yellow",
    3: "silver",
    4: "blue",
    5: "green",
  };

  let todayPerformance = "";
  let performanceColor = "";

  if (todayOrder.length <= 1) {
    todayPerformance = "Very Bad";
    performanceColor = statusToTagName[1];
  } else if (todayOrder.length <= 3) {
    todayPerformance = "Bad";
    performanceColor = statusToTagName[2];
  } else if (todayOrder.length <= 6) {
    todayPerformance = "Average";
    performanceColor = statusToTagName[3];
  } else if (todayOrder.length <= 10) {
    todayPerformance = "Good";
    performanceColor = statusToTagName[4];
  } else {
    todayPerformance = "Very Good";
    performanceColor = statusToTagName[5];
  }

  let totalPerformance = "";
  let performanceColortotal = "";

  if (ordersThisMonth.length <= 1) {
    totalPerformance = "Very Bad";
    performanceColortotal = statusToTagName[1];
  } else if (ordersThisMonth.length <= 3) {
    totalPerformance = "Bad";
    performanceColortotal = statusToTagName[2];
  } else if (ordersThisMonth.length <= 6) {
    totalPerformance = "Average";
    performanceColortotal = statusToTagName[3];
  } else if (ordersThisMonth.length <= 10) {
    totalPerformance = "Good";
    performanceColortotal = statusToTagName[4];
  } else {
    totalPerformance = "Very Good";
    performanceColortotal = statusToTagName[5];
  }

  let salaryPerformance = "";
  let performanceColorsalary = "";

  if (ordersThisMonth.length <= 1000) {
    salaryPerformance = "Very Bad";
    performanceColorsalary = statusToTagName[1];
  } else if (ordersThisMonth.length <= 4000) {
    salaryPerformance = "Bad";
    performanceColorsalary = statusToTagName[2];
  } else if (ordersThisMonth.length <= 10000) {
    salaryPerformance = "Average";
    performanceColorsalary = statusToTagName[3];
  } else if (ordersThisMonth.length <= 15000) {
    salaryPerformance = "Good";
    performanceColorsalary = statusToTagName[4];
  } else {
    salaryPerformance = "Very Good";
    performanceColorsalary = statusToTagName[5];
  }
  return (
    <TableRowOrder>
      <Stacked>
        <h1>{name}</h1>
        <p>{mobile}</p>
      </Stacked>
      <Stacked>
        <h1>{todayOrder.length}</h1>
        <Tag type={performanceColor}>{todayPerformance.replace("-", " ")}</Tag>
      </Stacked>
      <Stacked>
        <h1>{ordersThisMonth.length}</h1>
        <Tag type={performanceColortotal}>
          {totalPerformance.replace("-", " ")}
        </Tag>
      </Stacked>
      <Stacked>
        <h1>₹{totalSalaryThisMonth}</h1>
        <Tag type={performanceColorsalary}>
          {salaryPerformance.replace("-", " ")}
        </Tag>
      </Stacked>
    </TableRowOrder>
  );
}

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: var(--color-grey-600);
  p {
    color: var(--color-grey-400);
  }
  h1 {
    color: var(--color-grey-600);
  }
`;
export const TableRowOrder = styled.div`
  display: grid;
  font-size: 1.2rem;
  text-transform: capitalize;
  grid-template-columns: 3fr 2fr 2fr 2fr;
  column-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  @media ${device.tablet} {
    font-size: 1rem;
    column-gap: 0.5rem;
    padding: 2rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.8rem;
    padding: 1rem 1rem;
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.1rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  @media ${device.tablet} {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.5rem;
    padding: 0.2rem 0.4rem;
  }
  @media ${device.mobileS} {
    font-size: 0.4rem;
    padding: 0.2rem 0.5rem;
  }
`;
