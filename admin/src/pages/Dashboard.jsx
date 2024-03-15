import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <StledDashboard>
      <StyledFilter>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </StyledFilter>
      <StyledContainer>
        <DashboardLayout />
      </StyledContainer>
    </StledDashboard>
  );
}

export default Dashboard;

const StledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding-left: 140px;
`;

const StyledFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;
