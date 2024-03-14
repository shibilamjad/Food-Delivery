import styled from "styled-components";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function OrderFilter() {
  return (
    <TableOperations>
      <Filter
        options={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "inprogress", label: "InProgress" },
          { value: "success", label: "Success" },
        ]}
      />
      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderFilter;

const TableOperations = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
`;
