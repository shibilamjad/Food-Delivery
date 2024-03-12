import styled from "styled-components";
import Stats from "./Stats";
import { useDashboard } from "./useDashBoard";
import { Loader } from "../../ui/Loader";
import SalesChart from "./SalesChart";
import SalesChartOrder from "./SalesChartOrder";

function DashboardLayout({ currentFilter }) {
  const { orderStats, isLoading } = useDashboard();
  if (isLoading) return <Loader />;
  return (
    <StyledDashboardLayout>
      <StyledStats>
        <Stats orderStats={orderStats.ordersCompleted} />
      </StyledStats>
      <SalesChart
        currentFilter={currentFilter}
        orderStats={orderStats.ordersCompleted}
      />
      <SalesChartOrder
        currentFilter={currentFilter}
        orderStats={orderStats.ordersCompleted}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const StyledStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2.4rem;
`;
