import { MenuRow } from "./MenuRow";
import { Table, TableHeader } from "../../ui/Row";

export function MenuTable() {
  return (
    <Table>
      <TableHeader>
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Available</div>
        <div></div>
      </TableHeader>

      <MenuRow />
    </Table>
  );
}
