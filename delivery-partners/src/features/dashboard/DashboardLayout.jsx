import styled from "styled-components";
import Stats from "../../ui/Stats";
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

function DashboardLayout() {
  const { orderStats, isLoading } = useDashboard();
  const { users } = useUserList();
  if (isLoading) return <Loader />;
  return (
    <StyledDashboardLayout>
      <Stats orderStats={orderStats} />
      <TodayActivity orderStats={orderStats} users={users} />
      <DurationChart orderStats={orderStats} />

      <SalesChart orderStats={orderStats} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
