import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import { generatePastMonthsOptions } from "../../utils/generatePastMonthsOptions";

function DeliveryFilter() {
  const options = generatePastMonthsOptions();

  return (
    <TableOperations>
      <SortBy options={options} />
    </TableOperations>
  );
}

export default DeliveryFilter;

const TableOperations = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
`;
