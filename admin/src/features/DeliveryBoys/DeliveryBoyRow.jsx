import styled from "styled-components";
import { device } from "../../ui/device";

export function DeliveryBoyRow({ deliveryBoys }) {
  const { name, mobile, ordersCompleted } = deliveryBoys;
  // 1 today orders
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const todayDate = today.toISOString().slice(0, 10);
  // filter orders for today
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
    2: "blue",
    3: "green",
    4: "grey",
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

  return (
    <TableRowOrder>
      <Stacked>
        <h1>{name}</h1>
        <p>{mobile}</p>
      </Stacked>
      <Stacked>
        {todayOrder.length}
        <h2 className={`performance-${statusToTagName[todayOrder.length]}`}>
          {todayPerformance}
        </h2>
      </Stacked>
      <Stacked>{ordersThisMonth.length}</Stacked>
      <Stacked>₹{totalSalaryThisMonth}</Stacked>
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
  h2 {
    display: flex;
    align-items: center;
    background-color: red;
    width: 70px;
    font-size: 15px;
    font-weight: 700;
    border-radius: 30px;
    padding: 10px;
  }
`;
const StyledCart = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-left: 10px;
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
