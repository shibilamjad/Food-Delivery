import { useMenu } from "./useMenu";
import { MenuRow } from "./MenuRow";
import { Loader } from "../../ui/Loader";
import { Table, TableHeader } from "../../ui/Row";

export function MenuTable() {
  const { menu, isLoading } = useMenu();

  if (isLoading) return <Loader />;
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
      {menu.map((items) => (
        <MenuRow menu={items} key={items._id} />
      ))}
    </Table>
  );
}
