import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import { useSearchParams } from "react-router-dom";

function Dashboard() {
  const [searchParams] = useSearchParams();

  const filterField = "last";
  const options = [
    { value: "1", label: "Today" },
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "365 ", label: "Last 1 year" },
  ];
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  return (
    <StledDashboard>
      <StyledContainer>
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter filterField={filterField} options={options} />
      </StyledContainer>
      <DashboardLayout currentFilter={currentFilter} />
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
