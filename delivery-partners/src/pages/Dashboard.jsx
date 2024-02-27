import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";

function Dashboard() {
  return (
    <StledDashboard>
      <StyledContainer>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </StyledContainer>
      <DashboardLayout />
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  /* height: 100%; */
`;
