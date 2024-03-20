import styled from "styled-components";
import Stats from "./Stats";
import { useDashboard } from "./useDashBoard";
import { Loader } from "../../ui/Loader";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";
import { useUserList } from "./useUser";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout({ currentFilter }) {
  const { orderStats, isLoading } = useDashboard();
  const { users } = useUserList();
  if (isLoading) return <Loader />;
  return (
    <StyledDashboardLayout>
      <Stats orderStats={orderStats} currentFilter={currentFilter} />
      <TodayActivity
        currentFilter={currentFilter}
        orderStats={orderStats}
        users={users}
      />
      <DurationChart currentFilter={currentFilter} orderStats={orderStats} />
      <SalesChart currentFilter={currentFilter} orderStats={orderStats} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
